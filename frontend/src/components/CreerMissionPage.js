import React, { useState } from 'react';
import '../css/CreerMissionPage.css';

function CreerMissionPage() {
  // État pour les données de mission
  const [missionData, setMissionData] = useState({
    name: '',
    instructions: '',
    reward: '',
    difficulty: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');

  // Fonction pour gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMissionData({ ...missionData, [name]: value });
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {

    const requeteData = {
      nom_mission: missionData.name,
      description_mission: missionData.instructions,
      date_creation: new Date().toISOString().slice(0, 10),
      public: 1,
      points: missionData.reward,
      difficulte: missionData.difficulty
    };

    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/missions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requeteData)
      });
      if (!response.ok) throw new Error('Erreur lors de la création de la mission');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      // Réinitialisation des données de mission après la soumission réussie
      setMissionData({
        name: '',
        instructions: '',
        reward: '',
        difficulty: ''
      });
    } catch (error) {
      console.error('Erreur lors de la création de la mission :', error);
      setError('Une erreur est survenue lors de la création de la mission.');
    }
  };

  return (
      <div className="container">
        <h2>Créer une nouvelle mission</h2>
        <button onClick={() => setShowModal(true)}>Créer une mission</button>

        {/* Modal pour créer une mission */}
        {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Nom de la mission:</label>
                    <input type="text" name="name" value={missionData.name} onChange={handleChange}/>
                  </div>
                  <div>
                    <label>Instructions:</label>
                    <textarea name="instructions" value={missionData.instructions} onChange={handleChange}/>
                  </div>
                  <div>
                    <label>Points:</label>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        step="100"
                        name="reward"
                        value={missionData.reward}
                        onChange={handleChange}
                    />
                    <span>{missionData.reward}</span>
                  </div>
                  <div>
                    <label>Difficulté:</label>
                    <div className="difficulty-buttons">
                      <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="1"
                            checked={missionData.difficulty === '1'}
                            onChange={handleChange}
                        />
                        Facile
                      </label>
                      <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="2"
                            checked={missionData.difficulty === '2'}
                            onChange={handleChange}
                        />
                        Normal
                      </label>
                      <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="3"
                            checked={missionData.difficulty === '3'}
                            onChange={handleChange}
                        />
                        Difficile
                      </label>
                    </div>
                  </div>
                  {/* Ajoutez d'autres champs de formulaire au besoin */}
                  <button type="submit">Créer Mission</button>
                </form>
              </div>
            </div>
        )}

        {/* Notification de création de mission */}
        {showNotification && (
            <div className="notification">Mission crée avec succès!</div>
        )}

        {/* Gestion des erreurs */}
        {error && <div className="error">{error}</div>}
      </div>
  );
}

export default CreerMissionPage;
