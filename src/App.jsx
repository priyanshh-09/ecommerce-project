import { HomePage } from "./Pages/HomePage"
import { Routes, Route } from "react-router"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />}/>
      <Route path="checkout" element={<div>hello</div>}/>
    </Routes> 
  );
}

export default App
