"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCredentials, logout } from "@/redux/slices/auth.slice";
import { setAxiosToken, getAccessToken } from "@/services/axios";

const AuthInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = getAccessToken();
      const storedUser = localStorage.getItem("user");

      if (storedUser && token) {
        const user = JSON.parse(storedUser);
        setAxiosToken(token);

        dispatch(
          setCredentials({
            user,
            accessToken: token,
          })
        );
      } else {
        dispatch(logout());
      }
    } catch (err) {
      dispatch(logout());
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
