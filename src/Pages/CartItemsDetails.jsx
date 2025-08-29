import { formatMoney } from "./checkout/utils/money";
import DeliveryOptions from "./checkout/DeliveryOptions";
import axios from "axios";
import { useState } from "react";

export default function CartItemsDetails({cartitem, deliveryoptions, loadCart}) {
   
     const [quantityUpdate, setQuantityUpdate] = useState(false);
     const [quantity, setQuantity] = useState(cartitem.quantity);

  const  deleteItem = async()=>{
    await axios.delete(`/api/cart-items/${cartitem.productId}`);
    await loadCart();
  }

  const updateQuantity = async()=>{
    // switch b/w true and false for quantityUpdate
  //  setQuantityUpdate(!quantityUpdate);

    if(quantityUpdate){
      await axios.put(`/api/cart-items/${cartitem.productId}`,{
        quantity: Number(quantity),
      })
  
      await loadCart();
      setQuantityUpdate(false);

    }else{
      setQuantityUpdate(true);
    }
  }

  const updateInputQuantity = (eve)=>{
     setQuantity(eve.target.value)
  }

  const keyDown = (eve)=>{
    if(eve.key === 'Enter'){
        updateQuantity();
    }else if(eve.key === 'Escape'){
         setQuantity(cartitem.quantity);
         setQuantityUpdate(false);
    }
  };

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
              Quantity:
              {quantityUpdate ? (
                <input type="text" className="updateQuantity" value={quantity} onChange={updateInputQuantity} onKeyDown={keyDown}/>
              ) : (
                <span className="quantity-label">{cartitem.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateQuantity}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteItem}
            >
              Delete
            </span>
          </div>
        </div>
   {/* comment addded */}
        <DeliveryOptions
          cartitem={cartitem}
          deliveryoptions={deliveryoptions}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}
