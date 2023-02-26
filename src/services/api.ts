import axios from "axios";

const api = axios.create({
  baseURL: "http://api.faleirosdev.com",
});

export default api;
