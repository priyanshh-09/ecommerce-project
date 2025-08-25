
import axios from "axios";
import { useState, useEffect} from "react";
import { Header } from "../../components/Header";
import "./OrdersPage.css";
import OrdersGrid from "./OrdersGrid";
export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  
  // use Ayscn Await to fetch the data
  useEffect(() => {
    const getOrdersData = async()=>{
      const res =  await axios.get("/api/orders?expand=products");
      setOrders(res.data);  
    }  
   getOrdersData();

  }, []);

  return (
    <>
      <title>Orders</title>

      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />;

      <Header cart={cart} />

        <div className="orders-page">
        <div className="page-title">Your Orders</div>
       
       <OrdersGrid orders={orders}/>

      </div>
    </>
  );
}
