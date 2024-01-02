import { useEffect } from "react";
import { bookOperations } from "../books";
import { useDispatch, useSelector } from "react-redux";
import { setBookData } from "../store/bookSlice";

const useBook = () => {
  const dispatch = useDispatch();

  const bookData = useSelector((store)=>store.book.bookData);

  
  useEffect(() => {
    if(bookData.length<1){
    getBookData();
    }

  }, []);

  const getBookData = async () => {
    try {
      const response = await bookOperations();
      dispatch(setBookData(response.data));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return null;
};

export default useBook;
