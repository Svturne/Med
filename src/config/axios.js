import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AsyncKeys from '../constant/AsyncKeys';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
});

const axiosPrivate = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
});

axiosPrivate.interceptors.request.use(async function (config) {
  const accessToken = await AsyncStorage.getItem(AsyncKeys.accessToken);
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

export {axiosInstance, axiosPrivate};
