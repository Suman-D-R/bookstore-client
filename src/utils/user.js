import axios from "axios";

export const login = async (data) => {
  const loginData = await axios.post(
    `https://bookstore-uooq.onrender.com/users/login`,
    data
  );
  return loginData;
};

export const register = async (data) => {
  const redisterData = await axios.post(
    `https://bookstore-uooq.onrender.com/users`,
    data
  );
  return redisterData;
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
