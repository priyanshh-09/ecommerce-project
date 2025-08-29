import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
window.axios = axios;

import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart}) {
  const [deliveryoptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  // this useEffect will run only once
  useEffect(() => {
    const getCheckoutData = async()=>{
    const res = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
    setDeliveryOptions(res.data);
    } ; 

    getCheckoutData();
  }, []);

  // this useEaffect will run every time when the cart gets changes
  useEffect(()=>{
    const fetchPaymentSummary =async()=>{
      
     const res = await axios.get("/api/payment-summary");
     setPaymentSummary(res.data);

    };

    fetchPaymentSummary();

  },[cart]);
   
  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />;
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryoptions={deliveryoptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}
