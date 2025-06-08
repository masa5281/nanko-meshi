import { auth } from "../config/firebase";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// リクエスト直前にトークンをセット
axiosClient.interceptors.request.use(async (request) => {
  const user = auth.currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    request.headers.Authorization = `Bearer ${idToken}`;
  }
  return request;
});

// レスポンス時にエラーコードがあれば格納
export const setupAxiosStateError = (setStateError) => {
  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 404) {
        setStateError(404);
      }
      if (error.code === "ERR_CANCELED") {
        return Promise.resolve(error);
      }
      return Promise.reject(error);
    }
  )
};
