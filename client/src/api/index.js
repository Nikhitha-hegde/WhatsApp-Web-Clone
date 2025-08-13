import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // matches your backend

export const getChats = async () => {
  console.log("API_URL:", API_URL);
  const res = await axios.get(`${API_URL}/api/messages`);
  return res.data;
};

export const getMessagesByWaId = async (wa_id) => {
  const res = await axios.get(`${API_URL}/api/messages/${wa_id}`);
  return res.data;
};

export const sendMessage = async (data) => {
  const res = await axios.post(`${API_URL}/api/messages`, data, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};