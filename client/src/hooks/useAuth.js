// useAuth.js
import {
  useState, useCallback, useEffect, useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { logout as authLogout } from "../api/Auth";
import { AUTH_ROUTE } from '../constants/Constants';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(localStorage.getItem("userSession"));
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const navigate = useNavigate();

  const login = useCallback((user, newToken) => {
    const devMultiplier = 10;
    const expireDate = new Date(new Date().getTime() + 1000 * 60 * 60 * devMultiplier);
    setToken(newToken);
    setUserData(user);
    setTokenExpirationDate(expireDate);

    localStorage.setItem("userSession", JSON.stringify({ user, token: newToken, expiration: expireDate.toISOString() }));
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    setUserData(null);
    setTokenExpirationDate(null);

    try {
      await authLogout();
      navigate(AUTH_ROUTE.LOGIN);
    } catch (error) {
      console.error('Error during logout:', error);
    }

    localStorage.removeItem("userSession");
  }, [navigate]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      const logoutTimer = setTimeout(logout, remainingTime);
      return () => clearTimeout(logoutTimer);
    }
    return () => {};
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userSession"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.user, storedData.token);
    }
  }, [login]);

  return useMemo(() => ({
    isLoggedIn: !!token,
    token,
    user: userData,
    login,
    logout,
  }), [token, userData, login, logout]);
};

export default useAuth;
