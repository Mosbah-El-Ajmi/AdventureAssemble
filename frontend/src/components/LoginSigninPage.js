import React, { useState } from 'react';
import AuthProvider, { useAuth } from "./auth.js";
import '../App.css';

function CreerLogSignPage() {
  const [logData, setLogData] = useState({
    name: '',
    password: ''
  });
  
  const [signData, setSignData] = useState({
    name: '',
    password: '',
    email: ''
  });

  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowSignin, setShowSignin] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
    setSignData({ ...signData, [name]: value });
  };

  const auth = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    if(document.getElementsByName("name").length > 0 && logData.name !== '' && logData.password !== ''){
      auth.loginAction(logData);
      document.getElementsByName("name")[0].style.color = "red";
      document.getElementsByName("password")[0].style.color = "red";
      setInterval(backNormal, 1000);
      function backNormal(){
        if(document.getElementsByName("name").length > 0){
          document.getElementsByName("name")[0].style.color = "black";
          document.getElementsByName("password")[0].style.color = "black";
        }
      }
      
      return
    }
    alert("Merci de remplir les deux champs");
  };
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (signData.name !== '' && signData.password !== '' && signData.email !== ''){
      const requeteData = {
        nom: signData.name,
        prenom: signData.name,
        mail: signData.email,
        mot_de_passe: signData.password
      };
      try {
        const response = await fetch('http://localhost:3001/utilisateurs/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requeteData)
        });
        if (response.ok){
          setShowSignin(false);
          setShowLogin(true);
          document.getElementsByName('con')[0].innerText = 'Vous pouvez maintenant vous connecter';
          document.getElementsByName('con')[0].style.backgroundColor = 'green';
        } else{throw new Error("Erreur lors de la création de l'utilisateur");}
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur : ", error);
      }
      return
    }
    alert("Merci de remplir les trois champs");
  };

  return (

    <div className="container">
	
	
      <button name='con' onClick={() => setShowLogin(true)}>Se connecter</button>
      {ShowLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>&times;</span>
            <form onSubmit={handleLogin}>
              <div>
                <label>Nom:</label>
                <input type="text" name="name" value={logData.name} onChange={handleChange} />
              </div>
              <div>
                <label>Mot de passe:</label>
                <textarea name="password" value={logData.password} onChange={handleChange} />
              </div>
              <button type="submit">Connection</button>
            </form>
          </div>
        </div>
      )}
      
      
      <button className="spaceUp" onClick={() => setShowSignin(true)}>S'inscrire</button>
      {ShowSignin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSignin(false)}>&times;</span>
            <form onSubmit={handleSignIn}>
              <div>
                <label>Nom:</label>
                <input type="text" name="name" value={signData.name} onChange={handleChange} />
              </div>
              <div>
                <label>Mot de passe:</label>
                <textarea name="password" value={signData.password} onChange={handleChange} />
              </div>
              <div>
                <label>Addresse e-mail:</label>
                <textarea name="email" value={signData.email} onChange={handleChange} />
              </div>
              <button type="submit">Inscription</button>
            </form>
          </div>
        </div>
      )}
	
	</div>

  );
}

export default CreerLogSignPage;
