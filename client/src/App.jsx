import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";

const App = () => {
  return (
    <div>
      <div>
        <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/products" element = {<Product/>}/>
        <Route path="/products/:id" element = {<ProductDetails/>}/>
        <Route path="/Cart" element = {<Cart/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App