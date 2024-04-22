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
        navigate("/dashboard");
        return;
      }
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
