import dayjs from "dayjs"

export default function DeliveryDate({selectedDiliveryOption}) {
  return (
       <div className="delivery-date">
                    {dayjs(selectedDiliveryOption.estimatedDeliveryTimeMs).format(
                      "dddd, MMMM, D"
                    )}
        </div>
  )
}
