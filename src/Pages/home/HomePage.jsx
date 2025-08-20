
import { ProductsGrid } from './productsGrid';
import axios from 'axios'
import { useEffect,useState } from 'react';
import { Header } from "../../components/Header";
import "./HomePage.css";

export function HomePage({cart}) {
  const[products,setProducts] = useState([])
  
  useEffect(()=>{
    axios.get("/api/products").then((res) => {
       setProducts(res.data)
    });
  },[])
     
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />;
      <Header cart={cart} />
      
      <div className="home-page">
      <ProductsGrid products={products}/>
      </div>
    </>
  );
}
