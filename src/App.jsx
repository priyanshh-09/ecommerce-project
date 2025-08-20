import { CheckoutPage } from "./Pages/checkout/CheckoutPage";
import axios from 'axios'
import { HomePage } from "./Pages/home/HomePage"
import { Routes, Route } from "react-router"
import { OrdersPage } from "./Pages/orders/OrdersPage";
import { TrackingPage } from "./Pages/TrackingPage";
import { ErrorDisplay } from "./Pages/ErrorDisplay";
import { useEffect, useState } from "react";


function App() {
    const[cart, setCart] = useState([])
    
    useEffect(()=>{
        const getAppData = async ()=>{
        const res = await axios.get("/api/cart-items?expand=product");
        setCart(res.data);
      }
      getAppData();
    },[])
     
  return (
      <Routes>
        <Route index element={<HomePage cart={cart}/>}/>
        <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>
        <Route path="orders" element={<OrdersPage cart={cart} />}/>
        <Route path="tracking" element={<TrackingPage />}/>
      <Route path="*" element={<ErrorDisplay/>} />
      </Routes>

  );
}

export default App
