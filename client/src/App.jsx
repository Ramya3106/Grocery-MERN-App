import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <div>
        <Routes>
        <Route path="/" element = {<Home/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App