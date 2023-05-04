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
  async error => {
    const originalRequest = error.config;
    if (error.response) {
      if (
        (error.response.status === 401 || error.response.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const access_token = await refresh();

        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;

        return axiosPrivate(originalRequest);
      }
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

const refresh = async () => {
  try {
    const response = await axiosRefresh.post('/medecin/refreshtoken');
    await AsyncStorage.setItem(
      AsyncKeys.accessToken,
      response.data.accessToken,
    );
    await AsyncStorage.setItem(
      AsyncKeys.refreshToken,
      response.data.refreshToken,
    );
    return response.data.accessToken;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const axiosPrivateUser = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
});

axiosPrivateUser.interceptors.request.use(async function (config) {
  const accessToken = await AsyncStorage.getItem(AsyncKeys.accessTokenUser);

  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

axiosPrivateUser.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response) {
      if (
        (error.response.status === 401 || error.response.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const access_token = await refreshUser();

        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;

        return axiosPrivateUser(originalRequest);
      }
    }
    return error;
  },
);

const axiosRefreshPatient = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
});

axiosRefreshPatient.interceptors.request.use(async function (config) {
  const refreshToken = await AsyncStorage.getItem(AsyncKeys.refreshTokenUser);
  config.headers['Authorization'] = `Bearer ${refreshToken}`;
  return config;
});

const refreshUser = async () => {
  try {
    const response = await axiosRefreshPatient.post('/patient/user/refresh');
    await AsyncStorage.setItem(
      AsyncKeys.accessTokenUser,
      response.data.accessToken,
    );
    await AsyncStorage.setItem(
      AsyncKeys.refreshTokenUser,
      response.data.refreshToken,
    );

    return response.data.accessToken;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export {
  axiosInstance,
  axiosPrivate,
  axiosRefresh,
  axiosRefreshPatient,
  refresh,
  axiosPrivateUser,
  refreshUser,
};
