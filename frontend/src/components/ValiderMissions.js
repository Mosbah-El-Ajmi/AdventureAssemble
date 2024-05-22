import "../css/SuiviMissions.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidationMissions = () => {
    const [missionsActive, setMissionsActive] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);

    useEffect(() => {
        axios
            .get(
                "http://localhost:3001/missions_active" +
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

    const validateMissionStatus = (missionId) => {
        axios
            .put(
                `http://localhost:3001/missions_active/validation/${missionId}` +
                "/" +
                localStorage.getItem("auth_token")
            )
            .then((response) => {
                console.log("Mission status updated successfully:", response);
                // Met à jour de l'état local de la mission
                const updatedMissions = missionsActive
                    .map((missionActive) =>
                        missionActive.id_mission_active === missionId
                            ? { ...missionActive, id_status: 2 }
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
                <h1 className="titre">Liste des missions</h1>
            </div>
            <div className="missions-list">
                {missionsActive.map((missionActive) => (
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
                                <button
                                    className="valider"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        validateMissionStatus(missionActive.id_mission_active);
                                    }}
                                >
                                    Valider
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ValidationMissions;