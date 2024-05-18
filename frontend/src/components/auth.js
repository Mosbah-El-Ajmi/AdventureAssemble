import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/utilisateurs/auth/"+data.name+"/"+data.password);
      const res = await response.json();
      if (res.token) {
        setUser(data.name);
        setToken(res.token);
        localStorage.setItem("auth_token", res.token);
        localStorage.setItem("nom", res.nom);
        localStorage.setItem("util_id", res.id);
        try {
          const response2 = await fetch("http://localhost:3001/joueurs/utilisateur/"+localStorage.getItem('util_id'));
          const res2 = await response2.json();
          if (res2[0].pseudo) {
            localStorage.setItem("pseudo", res2[0].pseudo);
            localStorage.setItem("joueur_id", res2[0].id_joueur);
          }
          throw new Error(res.message);
        }
        catch (err) {
          localStorage.setItem("pseudo", 'None');
          localStorage.setItem("joueur_id", 'None');
        }
        navigate("/dashboard");
        return;
      };
       throw new Error(res.message);
      }
      catch (err) {
        console.error("Erreur lors de l'authentification");
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
