import axios from "axios";

const bearer_token = localStorage.getItem("accessTokenBookstore");
const headers = {
  Authorization: `Bearer ${bearer_token}`,
  "Content-Type": "application/json",
};

export const getAddress = async (endpoint = "") => {
    try {
      const response = await axios.get(
        `https://bookstore-uooq.onrender.com/address${endpoint}`,
        {
          headers: headers,
        }
      );
  
      const address = response.data;
  
      return address;
    } catch (error) {
      // Handle errors
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  export const addAddress = async (data) => {
    try {
      const response = await axios.post(
        `https://bookstore-uooq.onrender.com/address`,{data},
        {
          headers: headers,
        }
      );
  
      const addressData = response.data;
  
      return addressData;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };