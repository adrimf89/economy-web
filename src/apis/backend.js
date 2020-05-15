import axios from "axios";

let apiInstance = axios.create({
  //baseURL: 'https://my-json-server.typicode.com/adrimf89/api'
  //baseURL: 'http://localhost:3001'
  baseURL: process.env.REACT_APP_API_URL
});

// Set the AUTH token for any request
apiInstance.interceptors.request.use(function(config) {
  const token = JSON.parse(localStorage.getItem("token"));
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default apiInstance;
