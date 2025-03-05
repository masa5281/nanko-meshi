import { auth } from "./firebase/firebase";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_DEV_API_URL,
});

// リクエスト直前にトークンをセット
api.interceptors.request.use(async (request) => {
  const user = auth.currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    request.headers.Authorization = `Bearer ${idToken}`;
  }
  return request;
});
