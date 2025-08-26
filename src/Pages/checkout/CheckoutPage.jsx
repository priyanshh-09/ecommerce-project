import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";

import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart}) {
  const [deliveryoptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getCheckoutData = async()=>{
    let res = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
    setDeliveryOptions(res.data);

     res = await axios.get("/api/payment-summary")
     setPaymentSummary(res.data);
    }   

    getCheckoutData();
  }, [cart]);
   
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
