import { auth } from "../config/firebase";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants";

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
        const errorUrl = error.config.url;

        if (errorUrl.startsWith(API_ENDPOINTS.USERS.BASE)) {
          return Promise.reject(error);
        }
        setStateError(404);
      }
      if (error.code === "ERR_CANCELED") {
        return Promise.resolve(error);
      }
      return Promise.reject(error);
    }
  )
};
