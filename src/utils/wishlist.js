import axios from "axios";

const bearer_token = localStorage.getItem("accessTokenBookstore");
const headers = {
  Authorization: `Bearer ${bearer_token}`,
  "Content-Type": "application/json",
};

export const wishlistOperations = async (endpoint = "") => {
    try {
      const response = await axios.get(
        `https://bookstore-uooq.onrender.com/wishlist${endpoint}`,
        {
          headers: headers,
        }
      );
  
      const bookData = response.data;
  
      return bookData;
    } catch (error) {
      // Handle errors
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  export const wishlistOperationsUpdate = async (endpoint) => {
    try {
      const response = await axios.post(
        `https://bookstore-uooq.onrender.com/wishlist/${endpoint}`,{},
        {
          headers: headers,
        }
      );
  
      const bookData = response.data;
  
      return bookData;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };


  export const wishlistDelete = async (endpoint) => {
    try {
      const response = await axios.delete(
        `https://bookstore-uooq.onrender.com/wishlist/${endpoint}`,
        {
          headers: headers,
        }
      );
  
      const bookData = response.data;
  
      return bookData;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

