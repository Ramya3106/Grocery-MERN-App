import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setuser ] = useState(null);
    const [isSeller, setIsSeller] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const[Products, setProducts] = useState([]);
    const[cartItems, setCartItems] = useState({});
    const[searchQuery, setSearchQuery] = useState({});


    // fetch all products data
    const fetchProducts=async()=>{
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                console.error("Failed to fetch products:", data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // check seller authentication
    const checkSellerAuth = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    // check user authentication
    const checkUserAuth = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            if (data.success) {
                setuser(data.user);
                // Load user's cart data if available
                if (data.user.cartItems) {
                    setCartItems(data.user.cartItems);
                }
            } else {
                setuser(null);
            }
        } catch (error) {
            setuser(null);
        }
    }
   // // add product to cart
   const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId] += 1;
    }else{
        cartData[itemId] = 1;
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
        totalCount += cartItems[item];
    }
    return totalCount;
   };

   // total cart amount
   const totalCartAmount=()=>{
    let totalAmount=0;
    for (const items in cartItems){
        let itemInfo=Products.find((product)=>product._id===items);
        if(cartItems[items]>0){
            totalAmount += cartItems[items] + itemInfo.offerPrice;
        }
    }
    return Math.floor(totalAmount * 100) / 100;
   }

   // remove product from cart
   const removeFromCart=(itemId)=>{
    let cartData=structuredClone(cartItems);
    if(cartData[itemId]) {
        cartData[itemId] -= 1;
        if(cartData[itemId] ===0 ){
            delete cartData[itemId];
        }
        toast.success("removed from cart");
        setCartItems(cartData);
    }
   }
   useEffect(() => {
     const updateCart = async () => {
        // Only sync cart with backend if user is authenticated
        if (!user) {
            return; // For guest users, just keep cart in local state
        }
        
        try {
            const {data} = await axios.post("/api/cart/update", {cartItems: cartItems});   
            if(!data.success) {
                toast.error(data.message);
            } 
        } catch(error) {
            console.error("Cart update error:", error);
            if (error.response) {
                // Don't show error for authentication issues when user is not logged in
                if (error.response.status === 401 || error.response.status === 404) {
                    console.log("Cart sync skipped - user not authenticated");
                    return;
                }
                toast.error(error.response.data?.message || `Error: ${error.response.status}`);
            } else if (error.request) {
                console.log("Network error during cart sync");
            } else {
                toast.error(error.message || "An unexpected error occurred");
            }
        }
     };
     
     updateCart();
   }, [cartItems, user]);

    useEffect(()=>{
        fetchProducts();
        checkSellerAuth();
        checkUserAuth();
    },[]);
    const value = {navigate,user,setuser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,Products,cartItems,addToCart,updateCartItem,cartCount,totalCartAmount,removeFromCart,searchQuery, setSearchQuery,axios,fetchProducts,checkUserAuth,};
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider;
