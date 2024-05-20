import '../css/SuiviMissions.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListeMissions = () => {
    const [missionsActive, setMissionsActive] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:3001/missions_active')
            .then(response => {
                const sortedMissions = response.data.sort((a, b) => a.id_status - b.id_status);
                setMissionsActive(response.data);
            })
            .catch(error => {
                console.error('Error fetching missions:', error);
            });
    }, []);

    const handleClick = (missionId) => {
        setSelectedMission(selectedMission === missionId ? null : missionId);
    };

    const validateMissionStatus = (missionId) => {
        axios.put(`http://localhost:3001/missions_active/validation/${missionId}`)
            .then(response => {
                console.log('Mission status updated successfully:', response);
                // Met à jour de l'état local de la mission
                const updatedMissions = missionsActive.map(missionActive =>
                    missionActive.id_mission_active === missionId ? { ...missionActive, id_status: 2 } : missionActive
                ).sort((a, b) => a.id_status - b.id_status);
                setMissionsActive(updatedMissions);
            })
            .catch(error => {
                console.error('Error updating mission status:', error);
            });
    };

    const leaveMissionStatus = (missionId) => {
        axios.put(`http://localhost:3001/missions_active/abandon/${missionId}`)
            .then(response => {
                console.log('Mission status updated successfully:', response);
                // Met à jour de l'état local de la mission
                const updatedMissions = missionsActive.map(missionActive =>
                    missionActive.id_mission_active === missionId ? { ...missionActive, id_status: 4 } : missionActive
                ).sort((a, b) => a.id_status - b.id_status);
                setMissionsActive(updatedMissions);
            })
            .catch(error => {
                console.error('Error updating mission status:', error);
            });
    };



    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        try {
            const formData = new FormData();
            formData.append('photo', file);

            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const imageUrl = response.data;
            const missionId = selectedMission; // Récupère l'ID de la mission sélectionnée
            console.log(`Mission ID: ${missionId}, Uploaded Image URL: ${imageUrl}`);

            axios.put(`http://localhost:3001/missions_active/photo/${missionId}`, {url: imageUrl})
                .then(response => {
                    console.log('Mission status updated successfully:', response);
                })

                .catch(error => {
                    console.error('Error updating mission status:', error);
                });


        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };



    return (
        <div className="app">
            <div>
                <h1 className="titre">Liste des missions</h1>
            </div>
            <div className="missions-list">
                {missionsActive.map(missionActive => (
                    <div
                        key={missionActive.id_mission_active}
                        className={`mission ${selectedMission === missionActive.id_mission_active ? 'expanded-' + missionActive.id_status : ''} mission-status-${missionActive.id_status}`}
                        onClick={() => handleClick(missionActive.id_mission_active)}
                    >
                        <h2>{missionActive.nom_mission}</h2>
                        {selectedMission === missionActive.id_mission_active && (
                            <>
                                <p>{missionActive.description_mission}</p>
                                {missionActive.id_status === 1 && (
                                    <input type="file" onClick={(e) => { e.stopPropagation();}} onChange={handleFileChange} />
                                )}
                                {missionActive.id_status === 2 && (
                                    <img src={missionActive.photo_url} alt="image mission" className="cloudinary-image" />
                                )}
                                {missionActive.id_status === 1 && (
                                    <button className="valider" onClick={(e) => { e.stopPropagation(); validateMissionStatus(missionActive.id_mission_active); }}>Valider</button>
                                )}
                                {missionActive.id_status === 1 && (
                                    <button className="abandonner" onClick={(e) => { e.stopPropagation(); leaveMissionStatus(missionActive.id_mission_active); }}>Abandonner</button>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListeMissions;