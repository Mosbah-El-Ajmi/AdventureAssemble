import "../css/ValiderMissions.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidationMissions = () => {
    const [missionsActive, setMissionsActive] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);

    useEffect(() => {
        const joueurId = localStorage.getItem('joueur_id');
        axios
            .get(
                `https://backendgg.ddns.net/missions_active/EnAttente/${joueurId}` +
                "/" +
                localStorage.getItem("auth_token")
            )
            .then((response) => {
                response.data.sort(
                    (a, b) => a.id_status - b.id_status
                );
                setMissionsActive(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la recupération des missions:", error);
            });
    }, []);

    const handleClick = (missionId) => {
        setSelectedMission(selectedMission === missionId ? null : missionId);
    };

    const reussiMissionStatus = (missionId, points, joueurId) => {
        const statusId = 3;
        const token = localStorage.getItem("auth_token");
        axios
            .put(`https://backendgg.ddns.net/missions_active/status/${missionId}/${statusId}/${token}`)
            .then((response) => {
                console.log("Le status de la mission a bien été changé:", response);
                // Met à jour de l'état local de la mission
                const updatedMissions = missionsActive
                    .map((missionActive) =>
                        missionActive.id_mission_active === missionId
                            ? { ...missionActive, id_status: statusId }
                            : missionActive
                    )
                    .sort((a, b) => a.id_status - b.id_status);
                setMissionsActive(updatedMissions);
            })
            .catch((error) => {
                console.error("Il y a eu une erreur lors du changement de status de la mission:", error);
            });

        axios
            .put(`https://backendgg.ddns.net/joueurs/score/${points}/${joueurId}/${token}`)
            .then((response) => {
                console.log("Les points ont été rajouté au joueur:", response);
            })

            .catch((error) => {
                console.error("il y a eu une erreur lors de l'ajout des points au joueur:", error);
            });
    };

    const rateeMissionStatus = (missionId) => {
        const statusId = 1;
        const token = localStorage.getItem("auth_token");
        axios
            .put(`https://backendgg.ddns.net/missions_active/status/${missionId}/${statusId}/${token}`)
            .then((response) => {
                console.log("Le status de la mission a bien été changé:", response);
                // Met à jour de l'état local de la mission
                const updatedMissions = missionsActive
                    .map((missionActive) =>
                        missionActive.id_mission_active === missionId
                            ? { ...missionActive, id_status: statusId }
                            : missionActive
                    )
                    .sort((a, b) => a.id_status - b.id_status);
                setMissionsActive(updatedMissions);
            })
            .catch((error) => {
                console.error("Il y a eu une erreur lors du changement de status de la mission:", error);
            });
    };


    return (
        <div className="app">
            <div>
                <h1 className="titre">Missions des joueurs à valider</h1>
            </div>
            <div className="missions-list">
                {missionsActive.map((missionActive) => (
                    missionActive.id_status === 2 && (
                        <div
                            key={missionActive.id_mission_active}
                            className={`mission ${
                                selectedMission === missionActive.id_mission_active
                                    ? "expanded-" + missionActive.id_status
                                    : ""
                            } mission-status-${missionActive.id_status}`}
                            onClick={() => handleClick(missionActive.id_mission_active)}
                        >
                            <h2>{missionActive.nom_mission}</h2>
                            {selectedMission === missionActive.id_mission_active && (
                                <>
                                    <p>{missionActive.description_mission}</p>
                                    <img
                                        src={missionActive.photo_url}
                                        alt="preuve pour valider la missions"
                                        className="cloudinary-image"
                                    />
                                    <p>La mission est :</p>
                                    <button
                                        className="reussie"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            reussiMissionStatus(missionActive.id_mission_active, missionActive.points, missionActive.id_joueur);
                                        }}
                                    >
                                        Réussie
                                    </button>
                                    <button
                                        className="ratee"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            rateeMissionStatus(missionActive.id_mission_active);
                                        }}
                                    >
                                        Ratée
                                    </button>
                                </>
                            )}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default ValidationMissions;