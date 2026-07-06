import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask backend

// ----------------- Register -----------------
export const registerUser = (nom, password, role = "agriculteur") => {
  return axios.post(`${API_URL}/register`, { nom, password, role });
};

// ----------------- Login -----------------
export const loginUser = (nom, password) => {
  return axios.post(`${API_URL}/login`, { nom, password });
};

// ----------------- Recherche -----------------
export const searchQuery = (query, user_id) => {
  return axios.post(`${API_URL}/search`, { query, user_id });
};
