import axios from "axios";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/conversations"
    : "/api/conversations";

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export const getConversations = async (userId) => {
  const { data } = await axios.get(`${URL}/${userId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
