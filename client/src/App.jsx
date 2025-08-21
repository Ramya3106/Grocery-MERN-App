import { Routes,Route } from "react-router-dom";
import React from 'react'

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