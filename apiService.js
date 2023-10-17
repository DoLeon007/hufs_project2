import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://172.24.238.84:4000';

// API 클라이언트 설정: 기본 URL, 헤더 및 타임아웃 설정
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// 사용자 로그인 처리: 서버에 로그인 요청 후 성공적으로 토큰을 받으면 로컬 저장소에 저장
const handleLogin = async (username, password) => {
  try {
    const response = await apiClient.post('/login', { username, password });
    if (response.data && response.data.token) {
      await storeUserData({ token: response.data.token });
    }
    return response.data; // 로그인 결과 반환
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// 모든 요청에 토큰을 헤더로 포함시킴
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 사용자 데이터(토큰 포함)를 로컬 저장소에 저장
export const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (e) {
    console.error("Failed to save the data to the storage", e);
    throw e;
  }
};

// 로컬 저장소에서 토큰을 가져옴
export const getToken = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.token;
    }
    throw new Error('Token not found');
  } catch (error) {
    console.error("Error fetching token", error);
    throw error;
  }
};

// 로컬 저장소에서 사용자 데이터를 가져옴
export const fetchUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData !== null) {
      return JSON.parse(userData);
    }
    throw new Error('User data not found in storage');
  } catch (e) {
    console.error("Failed to fetch the data from the storage", e);
    throw e;
  }
};

// 서버에서 음료 데이터를 가져옴
export const getDrinkData = async () => {
  try {
    const response = await apiClient.get('/drink');
    return response.data;
  } catch (error) {
    console.error("Error fetching drinks:", error);
    throw error;
  }
};

// 사용자 데이터를 서버에 전송
export const sendUserDataToDatabase = async (userData) => {
  try {
    const response = await apiClient.post('/user', userData);
    return response.data;
  } catch (error) {
    console.error("Error sending user data to the database:", error);
    throw error;
  }
};

// 사용자의 즐겨찾기 데이터를 서버에 전송
export const sendFavoriteDataToDatabase = async (favoriteData) => {
  try {
    const response = await apiClient.post('/favorite', favoriteData);
    return response.data;
  } catch (error) {
    console.error("Error sending favorite data to the database:", error);
    throw error;
  }
};
