import axios from 'axios';

const BASE_URL = 'http://172.30.1.11:4000'; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 
});

export const getDrinkData = async () => {
  try {
    const response = await apiClient.get('/drink');
    return response.data;
  } catch (error) {
    console.error("Error fetching drinks:", error);
    throw error;
  }
};

export const sendUserDataToDatabase = async (userData) => {
  try {
    const response = await apiClient.post('/user', userData);
    return response.data;
  } catch (error) {
    console.error("Error sending user data to the database:", error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    }
    throw error;
  }
};

export const sendFavoriteDataToDatabase = async (favoriteData) => {
  try {
    const response = await apiClient.post('/favorite', favoriteData);
    return response.data;
  } catch (error) {
    console.error("Error sending favorite data to the database:", error);
    throw error;
  }
};

