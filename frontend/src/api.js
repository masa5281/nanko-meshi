import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_DEV_API_URL
})
