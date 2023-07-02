import { useContext, createContext, useState } from "react";

const AppContext = createContext();
export function useAuth(){
    return useContext(AppContext);
}

export function AppProvider({ children}){
    
  const [isSidebar, setIsSidebar] = useState(true);
  const val = {
    isSidebar,
    setIsSidebar
  }
  return(
    <AppContext.Provider value = {val}>
        {children}
    </AppContext.Provider>
  )
}