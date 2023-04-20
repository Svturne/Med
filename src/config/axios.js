import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
});

const axiosPrivate = axios.create({
  baseURL: 'http://10.0.2.2:3000/api',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cdCI6IkpXVCJ9.eyJuYW1lIjoiTWVoZGkgQmFkc2kiLCJlbWFpbCI6Im1laGRpLmJhZEBvdXRsb29rLmNvbSIsImNvZGVSZXNldFBhc3N3b3JkIjpudWxsLCJpZCI6IjY0M2RmNGRlNzEyYjA5MzUxNmIyODI5ZSIsImlhdCI6MTY4MTk4MDEyMiwiZXhwIjoxNjgxOTgwMjEyfQ._gSZNtRETkd3QyPCo0nVsU9WkyNy8Hf7viIQ02hPcI0',
  },
});
export {axiosInstance, axiosPrivate};
