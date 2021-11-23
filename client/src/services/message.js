import axios from "axios";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/messages"
    : "/api/messages";

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getMessages = async (conversationId) => {
  const { data } = await axios.get(`${URL}/${conversationId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const addMessages = async (message) => {
  const { data } = await axios.post(URL, message, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
