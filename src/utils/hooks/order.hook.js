import { useEffect, useState } from "react";
import { getOrders } from "../order";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/orderSlice";

const useOrder = () => {
  const dispatch = useDispatch();

  const orderData = useSelector((store)=>store.order.orderItems);

  
  useEffect(() => {
    if(!orderData?.length){
    getOrderData();
    }

  }, []);

  const getOrderData = async () => {
    try {
      const response = await getOrders();
      dispatch(setOrders(response.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return null;
};

export default useOrder;
