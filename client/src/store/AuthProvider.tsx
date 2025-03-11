import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosClient from "../axios/client";

interface AuthContextValue {
  isLoggedIn: boolean;
  userData: null | {};
  accessToken: string;
}

const initialState = {
  isLoggedIn: false,
  userData: null,
  accessToken: "",
  refreshToken: () => {},
};
interface AuthContextProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextValue>(initialState);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const refreshToken = () => {};

  const contextValue: AuthContextValue = {
    isLoggedIn,
    userData,
    refreshToken,
    setIsLoggedIn,
    setUserData,
  };
  useEffect(() => {
    const checkAuth = async () => {
      if (!userData?.accessToken) {
        try {
          const { data } = await axiosClient.post(
            "http://localhost:8080/refresh-token"
          );
          console.log(data);
          setUserData(data);
          setIsLoggedIn(true);
        } catch (error) {
          console.log(error?.response.data);
        }
      }
    };
    checkAuth();
    return () => {};
  }, [userData]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export default AuthContextProvider;
