import { formatMoney } from "./utils/money";
import dayjs from "dayjs";

export default function DeliveryOptions({deliveryoptions, cartitem}) {
  return (

    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryoptions.map((deliveryoption) => {
        let priceString = "FREE Shiping";
        if (deliveryoption.priceCents > 0) {
          priceString = `${formatMoney(deliveryoption.priceCents)}- Shipping`;
        }
        return (
          <div key={deliveryoption.id} className="delivery-option">
            <input
              type="radio"
              checked={deliveryoption.id === cartitem.deliveryOptionId}
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
