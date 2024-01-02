import { useEffect, useState } from "react";
import { cartOperations } from "../cart";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../store/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();

  const cartData = useSelector((store)=>store.cart.cartItems);

  
  useEffect(() => {
    if(!cartData?.length){
    getCartData();
    }

  }, []);

  const getCartData = async () => {
    try {
      const response = await cartOperations();
      dispatch(setCartItems(response.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return null;
};

export default useCart;
