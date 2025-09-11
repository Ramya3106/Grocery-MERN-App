import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setuser ] = useState(null);
    const [isSeller, setIsSeller] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const[Products, setProducts] = useState([]);
    const[cartItems, setCartItems] = useState([]);


    // fetch all products data
    const fetchProducts=async()=>{
        setProducts(dummyProducts);
    }
   // // add product to cart
   const addToCart=(itemId)=>{
    let cartData=structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId] += 1;
    }else{
        cartData[itemId] =1;
    }
    setCartItems(cartData);
    toast.success("added to cart");
   }

   // update cart item quantity
   const updateCartItem=(itemId,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("cart updated");
   }

   // total cart items
   const cartCount =()=>{
    let totalCount = 0;
    for(const item in cartItems) {
        totalCount += cartItems[itemitem];
    }
    return totalCount;
   };

   // total cart amount
   const totalCartAmount=()=>{
    let totalAmount=0;
    
   }

    useEffect(()=>{
        fetchProducts();
    },[]);
    const value = {navigate,user,setuser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,Products,addToCart,updateCartItem,};
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider;
