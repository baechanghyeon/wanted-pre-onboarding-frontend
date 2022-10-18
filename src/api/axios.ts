import axios from "axios";

const API = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop/",
  headers: {
    "Content-Type": "application/json ",
  },
});

API.interceptors.response.use(
  (response) => {
    localStorage.setItem("token", response.data.access_token);
    return response;
  },
  (err) => {
    return err;
  }
);
export default API;
