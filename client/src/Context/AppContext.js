import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api";
const AppContext = createContext();
export function useAuth(){
    return useContext(AppContext);
}

export function AppProvider({ children}){
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState("");
  async function getUser(){
    try {
      const id = localStorage.getItem("users");
      const type = localStorage.getItem("userType");
      const res = await Api.get(`/user/${type}/${id}`);
      if(res.status === 200){
        console.log(res);
        console.log(res.data);
        setUser(res.data.user);
      }
      else{
        localStorage.removeItem("users");
        localStorage.removeItem("userType");
        navigate('/Register');
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUser();
 }, [])
  const val = {
    isSidebar,
    setIsSidebar,
    getUser,
    user
  }
  return(
    <AppContext.Provider value = {val}>
        {children}
    </AppContext.Provider>
  )
}