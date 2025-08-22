import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setuser ] = useState(null);
    const [isSeller, setIsSeller] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const value = {navigate,user,setuser,isSeller,setIsSeller,showUserLogin,setShowUserLogin};
    return <AppContextProvider value={value}>{children}</AppContextProvider>
}

export default AppContextProvider;