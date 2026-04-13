import axios from "axios";

const api = axios.create({
  baseURL: "/api/board",
  headers: { "Content-Type": "application/json" },
});

export default api;
