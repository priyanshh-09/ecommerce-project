import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { formatMoney } from "./utils/money";
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
          <div className="order-summary">
            {deliveryoptions.length > 0 &&
              cart.map((cartitem) => {
                const selectedDiliveryOption = deliveryoptions.find(
                  (deliveryOption) => {
                    return deliveryOption.id === cartitem.deliveryOptionId;
                  }
                );
                return (
                  <div key={cartitem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      {dayjs(
                        selectedDiliveryOption.estimatedDeliveryTimeMs
                      ).format("dddd, MMMM, D")}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartitem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartitem.product.name}
                        </div>
                        <div className="product-price">
                          {formatMoney(cartitem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {cartitem.quantity}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryoptions.map((deliveryoption) => {
                          let priceString = "FREE Shiping";
                          if (deliveryoption.priceCents > 0) {
                            priceString = `${formatMoney(
                              deliveryoption.priceCents
                            )}- Shipping`;
                          }

                          return (
                            <div
                              key={deliveryoption.id}
                              className="delivery-option"
                            >
                              <input
                                type="radio"
                                checked={
                                  deliveryoption.id ===
                                  cartitem.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${cartitem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryoption.estimatedDeliveryTimeMs
                                  ).format("dddd,MMMM, D")}
                                </div>
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
