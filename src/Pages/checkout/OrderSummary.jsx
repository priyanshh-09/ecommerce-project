import dayjs from "dayjs";
import { formatMoney } from "./utils/money";
import DeliveryOptions from "./DeliveryOptions";

export function OrderSummary({cart, deliveryoptions}) {
  return (
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
                {dayjs(selectedDiliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM, D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartitem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartitem.product.name}</div>
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
                  
                  <DeliveryOptions cartitem={cartitem} deliveryoptions={deliveryoptions} />
              
              </div>
            </div>
          );
        })}
    </div>
  );
}
