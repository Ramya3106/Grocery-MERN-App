import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

const App = () => {
  return (
    <div>
      <div>
        <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/products" element = {<Products/>}/>

      </Routes>
      </div>
    </div>
  )
}

export default App