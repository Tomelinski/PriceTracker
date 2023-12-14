import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: URL,
});

export { api, URL };
