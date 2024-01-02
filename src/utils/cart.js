import axios from "axios";

const bearer_token = localStorage.getItem("accessTokenBookstore");
const headers = {
  Authorization: `Bearer ${bearer_token}`,
  "Content-Type": "application/json",
};

export const cartOperations = async (endpoint = "") => {
    try {
      const response = await axios.get(
        `https://bookstore-uooq.onrender.com/cart${endpoint}`,
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

  export const cartOperationsUpdate = async (endpoint) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/cart/${endpoint}`,{},
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


  export const deletFromCart = async (endpoint) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/cart/${endpoint}`,
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