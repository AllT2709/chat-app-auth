import axios from "axios";

const URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api";

export const login = async (user) => {
  const res = await axios.post(`${URL}/login`, user);
  return res.data;
};

export const getUser = async (userId) => {
  const res = await axios.get(`${URL}/users/${userId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
