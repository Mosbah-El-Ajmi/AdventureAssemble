import '../css/Table.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

let idPartie = 1; // à faire
const Table = () => {
  const [joueurs, setJoueurs] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:3001/joueurs/Partie/' + idPartie)
          .then(response => {
              setJoueurs(response.data);
          })
          .catch(error => {
              console.error('Error fetching joueurs:', error);
          });
  }, []);

  return (
    <div className="Table">
      <h3>Tableau de Classement</h3>
      <table>
      <thead>
      <tr>
        <th>Nom</th>
        <th>Points</th>
        <th>Points 24H</th>
        <th>Missions Finies</th>
        <th>Dernière Mission</th>
      </tr>
      </thead>
      <tbody>
      {joueurs.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.pseudo}</td>
            <td>{val.nombre_points}</td>
            <td>?</td>
            <td>?</td>
            <td>?</td>
          </tr>
        )
      })}
      </tbody>
      </table>
    </div>
  );
};

export default Table;
