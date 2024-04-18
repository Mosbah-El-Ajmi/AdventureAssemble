import React, { useState } from 'react';
import '../css/CreerMissionPage.css';

function CreerMissionPage() {
  const [missionData, setMissionData] = useState({
    name: '',
    instructions: '',
    successConditions: '',
    participants: '',
    reward: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Ajout d'un état de chargement
  const [error, setError] = useState(''); // Ajout d'un état pour les erreurs
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMissionData({ ...missionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Exemple de valeurs factices, remplacez-les par des valeurs appropriées
        id: '123', // ID généré ou récupéré de manière appropriée
        nom: missionData.name,
        description: missionData.instructions,
        auteur: 'auteur_id', // ID de l'auteur
        destinataire: 'destinataire_id', // ID du destinataire
        partie: 'partie_id', // ID de la partie
        point: 10, // Points attribués pour la mission
      }),
    };

    try {
      const response = await fetch('http://localhost:3001/missions/post/', requestOptions);
      if (!response.ok) throw new Error('Erreur lors de l\'envoi des données');
      const result = await response.json();
      console.log(result);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      // Réinitialisation des données de mission après la soumission réussie
      setMissionData({
        name: '',
        instructions: '',
        successConditions: '',
        participants: '',
        reward: ''
      });
    } catch (error) {
      console.error('Erreur lors de la création de la mission :', error);
      setError('Une erreur est survenue lors de la création de la mission.');
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <div className="container">
	
	
      <h2>Créer une nouvelle mission</h2>
      <button onClick={() => setShowModal(true)}>Créer une mission</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nom de la mission:</label>
                <input type="text" name="name" value={missionData.name} onChange={handleChange} />
              </div>
              <div>
                <label>Instructions:</label>
                <textarea name="instructions" value={missionData.instructions} onChange={handleChange} />
              </div>
              <div>
                <label>Conditions de réussite:</label>
                <input type="text" name="successConditions" value={missionData.successConditions} onChange={handleChange} />
              </div>
              <div>
                <label>Noms des participants:</label>
                <input type="text" name="participants" value={missionData.participants} onChange={handleChange} />
              </div>
              <div>
                <label>Récompense</label>
                <input type="text" name="reward" value={missionData.reward} onChange={handleChange} />
              </div>
              <button type="submit">Créer Mission</button>
            </form>
          </div>
        </div>
      )}
      {showNotification && (
        <div className="notification">Mission créée avec succès!</div>
      )}
	
	</div>

  );
}

export default CreerMissionPage;
