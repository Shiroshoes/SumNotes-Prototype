import axios from "axios";

const API_URL = "http://192.168.1.56:5000";

// --- Notes API ---
export const getNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
};

export const addNote = async (title, content) => {
  const response = await axios.post(`${API_URL}/notes`, { title, content });
  return response.data;
};

export const deleteNote = async (note_id) => {
  const response = await axios.post(`${API_URL}/delete/${note_id}`);
  return response.data;
};

export const restoreNote = async (note_id) => {
  const response = await axios.post(`${API_URL}/restore/${note_id}`);
  return response.data;
};

// --- NLP API ---
export const summarizeText = async (text) => {
  const response = await axios.post(`${API_URL}/summarize`, { text });
  return response.data.summary;
};

export const tokenizeText = async (text) => {
  const response = await axios.post(`${API_URL}/tokenize`, { text });
  return response.data.tokens;
};
