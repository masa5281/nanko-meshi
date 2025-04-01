import { createContext, useContext, useEffect, useState } from "react"
import { getUserApi } from "../api/userApi";
import { useAuth } from "./AuthContext";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [dbUserData, setDbUserData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const getUser = async () => {
      try {
        const userData = await getUserApi(user.uid);
        setDbUserData(userData);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [user])

  return (
    <UserDataContext.Provider value={{ dbUserData, setDbUserData }}>
      {children}
    </UserDataContext.Provider>
  )
};

export const useUserDataContext = () => useContext(UserDataContext);
