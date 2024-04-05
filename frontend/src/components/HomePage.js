import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import '../css/HomePage.css';

function HomePage() {
  let navigate = useNavigate(); // Utilise l'hook useNavigate pour la navigation

  const handleButtonClick = () => {
    navigate("/login-or-sign-in"); // Navigue vers la route /login-or-sign-in lorsque le bouton est cliqué
  };

  return (
    <div className="app">
      <div className="split-layout">
        <div className="image-section">
          {/* L'image sera ajoutée via CSS */}
        </div>
        <div className="text-section">
          <h1>Une aventure IRL à votre goût</h1>
          <p>Accomplissez des missions de folie entre potes, n'importe quand, n'importe où!</p>
          <p>Proposez vos idées les plus funs, défiez vos potes, et montez dans le classement pour devenir le Champion de la team. Qu'on soit partants pour explorer, créer, ou juste se marrer, GatherGame vous promet des moments inoubliables et des défis à relever ensemble.</p>
          <p>Alors, cap ou pas cap ? Rejoignez-nous et préparez-vous à des aventures IRL inoubliables!</p>
          <button className="cta" onClick={handleButtonClick}>Créer une mission dès maintenant</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;



