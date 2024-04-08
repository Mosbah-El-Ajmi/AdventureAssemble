import React, { useState } from 'react';
import './App.css';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMissionData({ ...missionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(missionData);
    setMissionData({
      name: '',
      instructions: '',
      successConditions: '',
      participants: '',
      reward: ''
    });
    setShowModal(false);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); 
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