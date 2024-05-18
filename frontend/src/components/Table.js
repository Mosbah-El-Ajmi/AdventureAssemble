import '../css/Table.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

let idPartie = 1; // à faire
const Table = () => {
  const [joueursLoaded, setJoueursLoaded] = useState(false);
  const [joueursBase, setJoueursBase] = useState([]);
  const [joueurs, setJoueurs] = useState([]);
  const [sorted, setSorted] = useState(0);
  useEffect(() => {
      axios.get('http://localhost:3001/joueurs/Partie/' + idPartie)
          .then(response => {
              setJoueursBase(response.data);
              setJoueursLoaded(true);
          })
          .catch(error => {
              console.error('Error fetching joueurs:', error);
          });
  }, []);
  
  useEffect(() => {
    if(joueursLoaded){
      let p24h=[];
      let c = 0;
      for(let joueur of joueursBase){
        axios.get('http://localhost:3001/missions_active/joueurNoms/' + joueur.id_joueur)
          .then(response => {
              joueursBase[c].missions = response.data.length;
              if(response.data.length == 0){
                joueursBase[c].lastMission = ' - ';
              } else{
                response.data.sort(function(a,b) {
                  if(a.date_fin < b.date_fin){
                    return 1;
                  }
                  return -1;
                });
                joueursBase[c].lastMission = response.data[0].nom_mission;
              }
          })
          .catch(error => {
              console.error('Error fetching missions number:', error);
          });
        axios.get('http://localhost:3001/missions_active/24h/' + joueur.id_joueur)
          .then(response => {
              let points = 0;
              for(let mission of response.data){
                points += mission.points;
              }
              p24h.push(points);
              joueursBase[c].p24h = points;
              if(c == joueursBase.length-1){
                setJoueurs(joueursBase);
              }
              c ++;
          })
          .catch(error => {
              console.error('Error fetching points:', error);
          });
      }
    }
  });
  
  function sortName(){
    joueurs.sort(function(a,b){
      if(a.pseudo < b.pseudo){
        return -1;
      }
      return 1;
    });
    setSorted(sorted+1);
  }
  
  function sortPoints(){
    joueurs.sort(function(a,b){
      if(a.nombre_points > b.nombre_points){
        return -1;
      }
      return 1;
    });
    setSorted(sorted+1);
  }
  
  function sort24h(){
    joueurs.sort(function(a,b){
      if(a.p24h > b.p24h){
        return -1;
      }
      return 1;
    });
    setSorted(sorted+1);
  }
  
  function sortFinies(){
    joueurs.sort(function(a,b){
      if(a.missions > b.missions){
        return -1;
      }
      return 1;
    });
    setSorted(sorted+1);
  }
  function sortLast(){
    joueurs.sort(function(a,b){
      if(a.lastMission === ' - '){
        return 1;
      }
      if(b.lastMission === ' - '){
        return -1;
      }
      if(a.lastMission < b.lastMission){
        return -1;
      }
      return 1;
    });
    setSorted(sorted+1);
  }

  return (
    <div className="Table">
      <h3>Tableau de Classement</h3>
      <table>
      <thead>
      <tr>
        <th><button onClick={sortName}>Nom ↑</button></th>
        <th><button onClick={sortPoints}>Points ↑</button></th>
        <th><button onClick={sort24h}>Points 24H ↑</button></th>
        <th><button onClick={sortFinies}>Missions Finies ↑</button></th>
        <th><button onClick={sortLast}>Dernière Mission ↑</button></th>
      </tr>
      </thead>
      <tbody id="content">
      {joueurs.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.pseudo}</td>
            <td>{val.nombre_points}</td>
            <td>{val.p24h}</td>
            <td>{val.missions}</td>
            <td>{val.lastMission}</td>
          </tr>
        )
      })}
      </tbody>
      </table>
      </div>
  );
};

export default Table;
