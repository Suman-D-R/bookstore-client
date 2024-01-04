import axios from "axios";

export const login = async (data) => {
  try {
    const loginData = await axios.post(
      "https://bookstore-uooq.onrender.com/users/login",
      data
    );
    return loginData;
  } catch (error) {
    return error;
  }
};


export const register = async (data) => {
  try
  {
    const redisterData = await axios.post(
    "https://bookstore-uooq.onrender.com/users",
    data
  );
  return redisterData;
}catch (error) {
  return error;
}
};

export const getUser = async (data) => {
  const Data = await axios.get(`https://bookstore-uooq.onrender.com/users`, {
    headers: {
      Authorization: `Bearer ${data}`,
      "Content-Type": "application/json",
    },
  });
  return Data;
};
