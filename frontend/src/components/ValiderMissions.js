import "../css/ValiderMissions.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidationMissions = () => {
    const [missionsActive, setMissionsActive] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);

    useEffect(() => {
        axios
            .get(
                "http://localhost:3001/missions_active/EnAttente" +
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
                console.error("Error fetching missions:", error);
            });
    }, []);

    const handleClick = (missionId) => {
        setSelectedMission(selectedMission === missionId ? null : missionId);
    };

    const reussiMissionStatus = (missionId) => {
        const statusId = 3;
        const token = localStorage.getItem("auth_token");
        axios
            .put(`http://localhost:3001/missions_active/status/${missionId}/${statusId}/${token}`)
            .then((response) => {
                console.log("Mission status updated successfully:", response);
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
                console.error("Error updating mission status:", error);
            });
    };

    const rateeMissionStatus = (missionId) => {
        const statusId = 1;
        const token = localStorage.getItem("auth_token");
        axios
            .put(`http://localhost:3001/missions_active/status/${missionId}/${statusId}/${token}`)
            .then((response) => {
                console.log("Mission status updated successfully:", response);
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
                console.error("Error updating mission status:", error);
            });
    };


    return (
        <div className="app">
            <div>
                <h1 className="titre">Missions à valider</h1>
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
                                            reussiMissionStatus(missionActive.id_mission_active);
                                        }}
                                    >
                                        Réussie
                                    </button>
                                    <button
                                        className="ratee"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            reussiMissionStatus(missionActive.id_mission_active);
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