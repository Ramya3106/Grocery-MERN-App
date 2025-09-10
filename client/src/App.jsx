import { Routes,Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import MyOrders from "./Pages/MyOrders";
import Auth from "./models/Auth";
import ProductCategory from "./Pages/ProductCategory";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {isSeller, showUserLogin}=useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div className="text-default min-h-screen">
      {isSellerPath?null:<Navbar />}
      {
        showUserLogin?<Auth/> :null
      }
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/products" element = {<Product/>}/>
        <Route path="/product/:category/:id" element = {<ProductDetails/>}/>
        <Route path="/products/:category" element = {<ProductCategory/>}/>
        <Route path="/Cart" element = {<Cart/>}/>
        <Route path="my-orders" element={<MyOrders/>}/>
      </Routes>
      </div>
      {isSellerPath ? null : <Footer/>}
    </div>
  )
}

export default App