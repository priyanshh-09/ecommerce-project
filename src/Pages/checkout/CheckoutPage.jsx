import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";

import "./CheckoutPage.css";

export function CheckoutPage({ cart }) {
  const [deliveryoptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((res) => {
        setDeliveryOptions(res.data);
      });

    axios.get("/api/payment-summary").then((res) => {
      setPaymentSummary(res.data);
    });
  }, []);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />;
      <CheckoutHeader />

      <div className="checkout-page">

        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
        
          <OrderSummary cart={cart} deliveryoptions={deliveryoptions}/>
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
