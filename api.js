// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: password,
    });
    return response.data; // This will return 'user' or 'admin'
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};