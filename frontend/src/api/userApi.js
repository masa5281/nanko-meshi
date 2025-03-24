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
export const createUserApi = async (uid, userName, userWeight) => {
  try {
    const response = await axiosClient.post(API_ENDPOINTS.USERS.BASE, {
      firebase_uid: uid,
      name: userName,
      weight: userWeight
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// ユーザーを更新
export const updateUserApi = async (userName, userWeight, userImage, uid) => {
  try {
    const createUserFormData = () => {
      const formData = new FormData();
      formData.append("user[name]", userName);
      formData.append("user[weight]", userWeight);
      if (userImage && userImage instanceof File) {
        formData.append("user[avatar]", userImage);
      }
      return formData;
    };
    const userFormData = createUserFormData();
    const data = await axiosClient.patch(`${API_ENDPOINTS.USERS.BASE}/${uid}`, userFormData);
    return data;
  } catch (error) {
    throw error;
  }
};
