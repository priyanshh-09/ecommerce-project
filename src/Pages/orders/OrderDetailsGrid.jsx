import { Fragment } from "react";
import { Link } from "react-router";
import dayjs from "dayjs";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";

export default function OrderDetailsGrid({order}) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderproduct) => {
        return (
          <Fragment key={orderproduct.product.id}>
            <div className="product-image-container">
              <img src={orderproduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderproduct.product.name}</div>
              <div className="product-delivery-date">
                {dayjs(orderproduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderproduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={BuyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderproduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
