import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // matches your backend

export const getChats = async () => {
  const res = await axios.get(`${API_URL}/messages`);
  return res.data;
};

export const getMessagesByWaId = async (wa_id) => {
  const res = await axios.get(`${API_URL}/messages/${wa_id}`);
  return res.data;
};

export const sendMessage = async (data) => {
  const res = await axios.post(`${API_URL}/messages`, data, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};