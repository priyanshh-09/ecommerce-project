import axios from 'axios';
import dayjs from 'dayjs';
import { Header } from '../components/Header';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import './TrackingPage.css';
import './header.css';
import { Link } from 'react-router';
 

export function TrackingPage({cart}){ 
    const {orderId , productId} = useParams();
    const[order, setOrder] = useState(null);

    // console.log(productId);
    // axios.get(`/api/orders/${order.id}?expand=products`)

    useEffect(()=>{
      const getTrackingData =async()=>{
        const res = await axios.get(`/api/orders/${orderId}?expand=products`)
        setOrder(res.data);
      }
      getTrackingData();
    },[orderId])
     
    if(!order){
      return null;
    }

    const orderProduct = order.products.find((orderProduct)=>{
      return orderProduct.productId === productId;
    });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

    let deliveryPercentage = (timePassedMs / totalDeliveryTimeMs)* 100;
    if(deliveryPercentage > 100){
      deliveryPercentage = 100;
    }

    const isPreparing = deliveryPercentage < 33;
    const isShipped = deliveryPercentage >= 33 && deliveryPercentage < 100;
    const isDelivered = deliveryPercentage === 100;

    return (
      <>
      <title>Tracking</title>
        <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />;
           
           <Header cart={cart}/>

        <div className="tracking-page">
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" href="/orders">
              View all orders
            </Link>

            <div className="delivery-date">{deliveryPercentage >= 100 ? 'Delivered on': 'Arriving on' } {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd,MMMM D')}</div>

            <div className="product-info">
              {orderProduct.product.name}
            </div>

            <div className="product-info">Quantity: {orderProduct.quantity}</div>

            <img
              className="product-image"
              src={orderProduct.product.image}
            />

            <div className="progress-labels-container">
              <div className={`progess-lable ${isPreparing && 'current-status'}`}>Preparing</div>
              <div className={`progess-lable ${isShipped && 'current-status'}`}>Shipped</div>
              <div className={`progess-lable ${isDelivered && 'current-status'}`}>Delivered</div>
            </div>

            <div className="progress-bar-container">
            <div className="progress-bar" style={{
              width:`${deliveryPercentage}%`
              }}></div>
            </div>
          </div>
        </div>
    
      </>
    );
}