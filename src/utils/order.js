import axios from "axios";

const bearer_token = localStorage.getItem("accessTokenBookstore");


export const getOrders = async () => {
  try {
    const orderData = await axios.get(`https://bookstore-uooq.onrender.com/order`, {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
        "Content-Type": "application/json",
      },
    });
    return orderData;
  } catch (error) {
    throw error;
  }
};


export const placeOrder = async (data) => {
  try {
    const response = await axios.post(
      `https://bookstore-uooq.onrender.com/order`,{data:data},
      {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const bookData = response.data;

    return bookData;
  } catch (error) {
    console.log("Error fetching books:", error);
    throw error;
  }
};
