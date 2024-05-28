import "../css/SuiviMissions.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ListeMissions = () => {
  const [missionsActive, setMissionsActive] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  //récup les missions du joueur connecté
  useEffect(() => {
    const joueurId = localStorage.getItem('joueur_id');
    axios
      .get(
        `https://backendgg.ddns.net/missions_active/joueur/${joueurId}` +
          "/" +
          localStorage.getItem("auth_token")
      )
        //trie les missions en fonction de leur status
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

  //change le status de la mission en "en attente" pour qu'ensuite un autre joueur puisse la valider.
  const validateMissionStatus = (missionId) => {
    axios
      .put(
        `https://backendgg.ddns.net/missions_active/validation/${missionId}` +
          "/" +
          localStorage.getItem("auth_token")
      )
      .then((response) => {
        console.log("Mission mise a jour:", response);
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
        console.error("Erreur lors de la mise a jour du status de la mission:", error);
      });
  };

  //change le status de la mission en "abandonné"
  const leaveMissionStatus = (missionId) => {
    axios
      .put(
        `https://backendgg.ddns.net/missions_active/abandon/${missionId}` +
          "/" +
          localStorage.getItem("auth_token")
      )
      .then((response) => {
        console.log("Mission mise a jour:", response);
        // Met à jour de l'état local de la mission
        const updatedMissions = missionsActive
          .map((missionActive) =>
            missionActive.id_mission_active === missionId
              ? { ...missionActive, id_status: 4 }
              : missionActive
          )
          .sort((a, b) => a.id_status - b.id_status);
        setMissionsActive(updatedMissions);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise a jour du status de la mission:", error);
      });
  };

  //recupère le photo, la publie sur cloudinary et récupère l'url de la photo pour la mettre dans la db avec la mission active lié
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await axios.post(
        "https://backendgg.ddns.net/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = response.data;
      const missionId = selectedMission; // Récupère l'ID de la mission sélectionnée
      console.log(`Mission ID: ${missionId}, Uploaded Image URL: ${imageUrl}`);

      axios
        .put(
          `https://backendgg.ddns.net/missions_active/photo/${missionId}` +
            "/" +
            localStorage.getItem("auth_token"),
          { url: imageUrl }
        )
        .then((response) => {
          console.log("L'url de la photo a bien été mis a jour:", response);
        })

        .catch((error) => {
          console.error("Il y a eu une erreur lors de la mise a jour de l'url de la photo:", error);
        });
    } catch (error) {
      console.error("Erreur quand la photo est posté:", error);
    }
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
            <h3>{missionActive.points} Points</h3>
            {selectedMission === missionActive.id_mission_active && (
              <>
                <p>{missionActive.description_mission}</p>
                {missionActive.id_status === 1 && (
                  <input
                    className="input-image"
                    type="file"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={handleFileChange}
                  />
                )}
                {(missionActive.id_status === 2 || missionActive.id_status === 3) && (
                  <img
                    src={missionActive.photo_url}
                    alt="preuve pour valider la missions"
                    className="cloudinary-image"
                  />
                )}
                {missionActive.id_status === 1 && (
                  <button
                    className="valider"
                    onClick={(e) => {
                      e.stopPropagation();
                      validateMissionStatus(missionActive.id_mission_active);
                    }}
                  >
                    Valider
                  </button>
                )}
                {missionActive.id_status === 1 && (
                  <button
                    className="abandonner"
                    onClick={(e) => {
                      e.stopPropagation();
                      leaveMissionStatus(missionActive.id_mission_active);
                    }}
                  >
                    Abandonner
                  </button>
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
