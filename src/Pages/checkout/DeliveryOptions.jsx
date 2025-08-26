import axios from "axios";
import { formatMoney } from "./utils/money";
import dayjs from "dayjs";

export default function DeliveryOptions({deliveryoptions, cartitem, loadCart}) {
  return (

    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryoptions.map((deliveryoption) => {
        let priceString = "FREE Shiping";

        if (deliveryoption.priceCents > 0) {
          priceString = `${formatMoney(deliveryoption.priceCents)}- Shipping`;
        }

        const updateDeliveryOptions = async()=>{
         await axios.put(`/api/cart-items/${cartitem.productId}`, {
            deliveryOptionId: deliveryoption.id
          });
          await loadCart();
        }

        return (
          <div key={deliveryoption.id} className="delivery-option" onClick={updateDeliveryOptions}>
            <input
              type="radio"
              checked={deliveryoption.id === cartitem.deliveryOptionId}
              onChange={()=>{}}
              className="delivery-option-input"
              name={`delivery-option-${cartitem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryoption.estimatedDeliveryTimeMs).format(
                  "dddd,MMMM, D"
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
