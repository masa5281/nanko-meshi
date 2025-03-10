import { axiosClient } from "./axiosClient";

// 特定のユーザーを取得
export const getUserApi = async (uid) => {
  try {
    const response = await axiosClient.get(`/api/v1/users/${uid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ユーザーを作成
export const createUserApi = async (uid, name) => {
  try {
    const response = await axiosClient.post("/api/v1/users", {
      firebase_uid: uid,
      name: name
    });
    return response;
  } catch (error) {
    throw error;
  }
};
