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
    
      const loadCart = async () => {
      const res = await axios.get("/api/cart-items?expand=product");
        setCart(res.data);
      };


    useEffect(()=>{ 
      loadCart();
    },[])
     
  return (
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart}/>}/>
        <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>
        <Route path="orders" element={<OrdersPage cart={cart} />}/>
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />}/>
      <Route path="*" element={<ErrorDisplay cart={cart}/>} />
      </Routes>

  );
}

export default App
