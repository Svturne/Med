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

axiosPrivate.interceptors.response.use(
  async response => {
    return response;
  },
  error => {
    console.log('====================================');
    console.log(error);
    console.log('====================================');

    if (error.response.status === 401 || error.response.status === 403) {
      console.log('error in response');
      refresh();
      originalRequest._retry = true;
    }
    return error;
  },
);

const axiosRefresh = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
});

axiosRefresh.interceptors.request.use(async function (config) {
  const refreshToken = await AsyncStorage.getItem(AsyncKeys.refreshToken);
  config.headers['Authorization'] = `Bearer ${refreshToken}`;
  return config;
});

const refresh = () => {
  console.log('Refreshing');
  axiosRefresh
    .post('/medecin/refreshtoken')
    .then(response => {
      console.log(response.data);
      AsyncStorage.setItem(AsyncKeys.accessToken, response.data.accessToken);
      AsyncStorage.setItem(AsyncKeys.refreshToken, response.data.refreshToken);
    })
    .catch(error => {
      console.log(error);
    });
};
export {axiosInstance, axiosPrivate, axiosRefresh, refresh};
