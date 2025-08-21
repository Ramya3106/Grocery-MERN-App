import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div>
      <div>
        <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/products" element = {<Products/>}/>
        <Route path="/products/:id" element = {<ProductDetails/>}/>
        <Route path="/Cart" element = {<Cart/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App