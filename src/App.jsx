import { CheckoutPage } from "./Pages/checkout/CheckoutPage";
import axios from 'axios'
import { HomePage } from "./Pages/HomePage"
import { Routes, Route } from "react-router"
import { OrdersPage } from "./Pages/OrdersPage";
import { TrackingPage } from "./Pages/TrackingPage";
import { ErrorDisplay } from "./Pages/ErrorDisplay";
import { useEffect, useState } from "react";


function App() {
    const[cart, setCart] = useState([])
    
    useEffect(()=>{
     axios.get("/api/cart-items").then((res) => {
       console.log(res.data);
       setCart(res.data);
     });
    },[])
     
  return (
      <Routes>
        <Route index element={<HomePage cart={cart}/>}/>
        <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>
        <Route path="orders" element={<OrdersPage />}/>
        <Route path="tracking" element={<TrackingPage />}/>
      <Route path="*" element={<ErrorDisplay/>} />
      </Routes>

  );
}

export default App
