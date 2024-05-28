import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../App.css';
import '../css/pseudos.css';

function ChoixJoueur() {
  const navigate = useNavigate();
  const [joueurs, setJoueurs] = useState([]);
  
  useEffect(() => {
    axios.get('https://backendgg.ddns.net/joueurs/utilisateur/' + localStorage.getItem('util_id') + '/' + localStorage.getItem('auth_token'))
      .then(response => {
        setJoueurs(response.data);
      })
      .catch(error => {
          console.error("Error en récupérant les joueurs de l'utilisateur :", error);
      });
  }, []);
  
  function setJoueur(id, pseudo, partie){
    localStorage.setItem("joueur_id", id);
    localStorage.setItem("pseudo", pseudo);
    localStorage.setItem("partie_id", partie);
    navigate("/dashboard");
  };


  return (

    <div className="liste-pseudos">
      <h3>Sélectionne un joueur</h3>
      <ul>
      {
       joueurs.map((val, key) => { 
         return (<li key={val.id_joueur} onClick={() => setJoueur(val.id_joueur, val.pseudo, val.id_partie)}>{val.pseudo}</li>)
       })}
      </ul>
	</div>

  );
}

export default ChoixJoueur;
