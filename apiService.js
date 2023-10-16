import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://172.24.238.84:4000'; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 
});

export const storeUserData = async (userData) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (e) {
        console.error("Failed to save the data to the storage", e);
    }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@user_token');
    console.log("Fetched token:", token);  // 로그를 찍는 부분
    return token;
  } catch (error) {
    console.error("Error fetching token", error);
  }
};

export const fetchUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
            return JSON.parse(userData);
        }
    } catch (e) {
        console.error("Failed to fetch the data from the storage", e);
    }
    return null;  
};

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

