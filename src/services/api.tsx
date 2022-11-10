import axios from "axios";

// API key: e4fcec0d04b4c36fe887647e07aaae28

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api
