import '../css/SuiviMissions.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListeMissions = () => {
    const [missions, setMissions] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:3001/missions')
            .then(response => {
                setMissions(response.data);
            })
            .catch(error => {
                console.error('Error fetching missions:', error);
            });
    }, []);

    const handleClick = (missionId) => {
        setSelectedMission(selectedMission === missionId ? null : missionId);
    };


    return (
            <div className="app">
                <div>
                    <h1 className="titre">Liste des missions</h1>
                </div>
                <div className="missions-list">
                    {missions.map(mission => (
                        <div key={mission.id_mission} className={`mission ${selectedMission === mission.id_mission ? 'expanded' : ''}`} onClick={() => handleClick(mission.id_mission)} >
                            <h2>{mission.nom_mission}</h2>
                            {selectedMission === mission.id_mission && <p>{mission.description_mission}</p>}
                            {selectedMission === mission.id_mission && <button className="valider">Valider</button>}
                            {selectedMission === mission.id_mission && <button className="abandonner">Abandonner</button>}

                        </div>
                    ))}
                </div>
            </div>
    );
};

export default ListeMissions;