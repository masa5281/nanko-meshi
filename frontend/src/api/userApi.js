import { API_ENDPOINTS } from "../utils/constants";
import { axiosClient } from "../config/axiosClient";

// 特定のユーザーを取得
export const getUserApi = async (uid) => {
  try {
    const response = await axiosClient.get(`${API_ENDPOINTS.USERS.BASE}/${uid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ユーザーを作成
export const createUserApi = async (uid, name) => {
  try {
    const response = await axiosClient.post(API_ENDPOINTS.USERS.BASE, {
      firebase_uid: uid,
      name: name
    });
    return response;
  } catch (error) {
    throw error;
  }
};
