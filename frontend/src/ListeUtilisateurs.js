import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListeUtilisateurs = () => {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/utilisateurs')
            .then(response => {
                setMissions(response.data);
            })
            .catch(error => {
                console.error('Error fetching missions:', error);
            });
    }, []);

    return (
        <div className="App">
            <h1>Liste des missions</h1>
            <div className="missions-list">
                {missions.map(mission => (
                    <div key={mission.id_mission} className="mission">
                        <h2>{mission.nom_mission}</h2>
                        <p>{mission.description_mission}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListeUtilisateurs;