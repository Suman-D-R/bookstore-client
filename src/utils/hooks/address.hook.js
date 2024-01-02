import { useEffect } from "react";
import { getAddress } from "../address";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../store/address";

const useAddress = () => {
  const dispatch = useDispatch();

  const addressData = useSelector((store)=>store.address.addressData);

  
  useEffect(() => {
    if(!addressData?.length){
    getAddressData();
    }

  }, []);

  const getAddressData = async () => {
    try {
      const response = await getAddress();
      dispatch(setAddress(response.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return null;
};

export default useAddress;
