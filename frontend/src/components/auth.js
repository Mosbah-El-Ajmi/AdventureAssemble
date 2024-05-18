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
        console.log('a');
        setUser(data.name);
        setToken(res.token);
        localStorage.setItem("auth_token", res.token);
        localStorage.setItem("nom", res.nom);
        localStorage.setItem("util_id", res.id);
        try {
          console.log('a');
          const response2 = await fetch("http://localhost:3001/joueurs/utilisateur/"+localStorage.getItem('util_id'));
          const res2 = await response2.json();
          console.log(res2);
          console.log(res2[0]);
          if (res2[0].pseudo) {
            console.log('a');
            localStorage.setItem("pseudo", res2[0].pseudo);
            navigate("/dashboard");
            return;
          }
          throw new Error(res.message);
        }
        catch (err) {
        }
      };
       throw new Error(res.message);
      }
      catch (err) {
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
