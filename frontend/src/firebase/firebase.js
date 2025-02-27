import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    // ユーザーが存在しない場合は新規登録
    const user = await createUserWithEmailAndPassword(auth, email, password);
    alert("登録成功");
    return user;
  } catch (error) {
    alert("登録失敗");
    console.log(error);
  }
}
