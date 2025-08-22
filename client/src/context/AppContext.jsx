import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
    const navigate=useNavigate();
    const value = {navigate}
    return <AppContextProvider value={value}>{children}</AppContextProvider>
}

export default AppContextProvider;