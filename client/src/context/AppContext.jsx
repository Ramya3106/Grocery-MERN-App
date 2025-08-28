import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setuser ] = useState(null);
    const [isSeller, setIsSeller] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const[products, setProducts] = useState([]);

    // fetch all products data
    const fetchProducts=async()=>{
        setProducts(dummyProducts);
    }
    useEffect{()=>{
        fetchProducts();
    },[]};
    const value = {navigate,user,setuser,isSeller,setIsSeller,showUserLogin,setShowUserLogin};
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider;
