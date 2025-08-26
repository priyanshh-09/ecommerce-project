import { formatMoney } from "./checkout/utils/money";
import DeliveryOptions from "./checkout/DeliveryOptions";
import axios from "axios";

export default function CartItemsDetails({cartitem, deliveryoptions, loadCart}) {

  const  deleteItem = async()=>{
    await axios.delete(`/api/cart-items/${cartitem.productId}`);
    loadCart();
  }
  return (
    <>
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
              <span className="quantity-label">{cartitem.quantity}</span>
            </span>
            <span className="update-quantity-link link-primary">Update</span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteItem}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          cartitem={cartitem}
          deliveryoptions={deliveryoptions}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}
