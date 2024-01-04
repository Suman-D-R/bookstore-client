import axios from "axios";

export const login = async (data) => {
  try {
    const loginData = await axios.post(
      "http://localhost:3000/api/v1/users/login",
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
    "http://localhost:3000/api/v1/users",
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
