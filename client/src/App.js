import './App.css';
import React, { useState, useCallback, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { Login, LoginSuccess, Register } from './components/user/Auth';
import { logout as authLogout } from "./api/Auth";
import { Nav2 } from "./components/nav";
import { Home } from "./components/Home";
import { ItemPage } from "./components/Item";
import { AUTH_ROUTE, ROUTE } from './constants/Constants';
import { Grid } from '@mui/material';
import { Footer } from './components/footer';

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const navigate = useNavigate();

  const login = useCallback((user, token, expirationDate) => {
    setToken(token);
    setUserData(user);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userData: user,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    setUserData(null);
    setTokenExpirationDate(null);
    try {
      const response = await authLogout();
      if (response.status === 200) {
        
        navigate(AUTH_ROUTE.LOGIN); 
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
    localStorage.removeItem("userData");
  }, [navigate]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userData,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path={ROUTE.HOME} element={<Home />} />
        <Route path={ROUTE.ITEM} element={<ItemPage />} />
        <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path={ROUTE.HOME} element={<Home />} />
        <Route path={`${ROUTE.ITEM}/:productID`} element={<ItemPage />} />
        <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
        <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
        <Route path={AUTH_ROUTE.LOGIN_SUCCESS} element={<LoginSuccess />} />
        <Route path={AUTH_ROUTE.LOGIN_GOOGLE} />
        <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
      </Routes>
    );
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          userData,
          login: login,
          logout: logout,
        }}
      >
          <Nav2 />
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              {routes}  
            </Grid>
          </Grid>
          <Footer />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
