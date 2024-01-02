import { useEffect } from "react";
import { wishlistOperations } from "../wishlist";
import { useDispatch, useSelector } from "react-redux";
import { setWishlistItems } from "../store/wishSlice";

const useWishlist = () => {
  const dispatch = useDispatch();

  const wishlistData = useSelector((store)=>store.wish.wishlist);

  
  useEffect(() => {
    if(!wishlistData?.length){
    getWishlistData();
    }

  }, []);

  const getWishlistData = async () => {
    try {
      const response = await wishlistOperations();
      dispatch(setWishlistItems(response.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return null;
};

export default useWishlist;
