
import CartItemsDetails from "../CartItemsDetails";
import DeliveryDate from "../DeliveryDate";

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

           <DeliveryDate selectedDiliveryOption={selectedDiliveryOption}/>
           <CartItemsDetails cartitem={cartitem} deliveryoptions={deliveryoptions}/>
           
            </div>
          );
        })}
    </div>
  );
}
