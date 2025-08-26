
import { ProductsGrid } from './ProductsGrid';
import axios from 'axios'
import { useEffect,useState } from 'react';
import { Header } from "../../components/Header";
import "./HomePage.css";

export function HomePage({cart, loadCart}) {
  const[products,setProducts] = useState([])
  
  useEffect(()=>{
      const getHomeData = async()=>{
      const res =  await axios.get("/api/products")
      setProducts(res.data);
    };

    getHomeData();
  },[]);
     

  return (
    <>
      <title>Ecommerce Project</title>

      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />;

      <Header cart={cart} />
      
      <div className="home-page">
      <ProductsGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}
