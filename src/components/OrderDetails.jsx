import React from "react";
import { useSelector } from "react-redux";
import "../sass/OrderDetails.scss";
import OrderBookCard from "./OrderBookCard";
import useOrder from "../utils/hooks/order.hook";

function OrderDetails() {
  const { data } = useSelector((store) => store?.order?.orderItems);
  useOrder();

  return (
    <>
      {data?.orderData?.length ? (
        <div className="my-order-container">
          {data?.orderData?.map((order) =>
            order.items.map((book) => (
              <div className="myorder-book" key={book._id}>
                <OrderBookCard data={book} />
              </div>
            ))
          )}
        </div>
      ) : (
        <div>no order items</div>
      )}
    </>
  );
}

export default OrderDetails;
