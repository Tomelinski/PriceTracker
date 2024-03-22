// App.js
import './App.css';
import React from "react";
import { Grid } from '@mui/material';
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import AuthContext from "./context/authContext";
import useAuth from "./hooks/useAuth";
import AppRoutes from "./Routes";

const App = () => {
  const auth = useAuth();

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <Nav />
        <Grid mt={3} container justifyContent="center">
          <Grid item xs={10}>
            <AppRoutes />
          </Grid>
        </Grid>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
};

export default App;

// import './App.css';
// import React, {
//   useState, useCallback, useEffect, useMemo,
// } from "react";
// import {
//   Route, Routes, Navigate, useNavigate,
// } from "react-router-dom";
// import { Grid } from '@mui/material';
// import AuthContext from "./context/authContext";
// import { Login, LoginSuccess, Register } from './components/auth';
// import { logout as authLogout } from "./api/Auth";
// import { Nav } from "./components/nav";
// import { Home } from "./components/home";
// import { ItemPage } from "./components/item/Page";
// import { UserProfile } from "./components/user/profile";
// import { AUTH_ROUTE, ROUTE } from './constants/Constants';
// import { Footer } from './components/footer';

// let logoutTimer;

// const App = () => {
//   const [token, setToken] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [tokenExpirationDate, setTokenExpirationDate] = useState();
//   const navigate = useNavigate();

//   const login = useCallback((user, newToken, expirationDate) => {
//     setToken(newToken);
//     setUserData(user);
//     const devMutliplier = 6;
//     const tokenExpireDate = expirationDate
//       || new Date(new Date().getTime() + 1000 * 60 * 60 * devMutliplier);
//     setTokenExpirationDate(tokenExpireDate);

//     localStorage.setItem(
//       "userData",
//       JSON.stringify({
//         userData: user,
//         token,
//         expiration: tokenExpireDate.toISOString(),
//       }),
//     );
//   }, []);

//   const logout = useCallback(async () => {
//     setToken(null);
//     setUserData(null);
//     setTokenExpirationDate(null);
//     try {
//       const response = await authLogout();
//       if (response.status === 200) {
//         navigate(AUTH_ROUTE.LOGIN);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//     localStorage.removeItem("userData");
//   }, [navigate]);

//   useEffect(() => {
//     if (token && tokenExpirationDate) {
//       const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
//       logoutTimer = setTimeout(logout, remainingTime);
//     } else {
//       clearTimeout(logoutTimer);
//     }
//   }, [token, logout, tokenExpirationDate]);

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("userData"));
//     if (
//       storedData
//       && storedData.token
//       && new Date(storedData.expiration) > new Date()
//     ) {
//       login(
//         storedData.userData,
//         storedData.token,
//         new Date(storedData.expiration),
//       );
//     }
//   }, [login]);

//   let routes;
//   if (token) {
//     routes = (
//       <Routes>
//         <Route path={ROUTE.HOME} element={<Home />} />
//         <Route path={ROUTE.ITEM(':productId')} element={<ItemPage />} />
//         <Route path={ROUTE.USER(':userId')} element={<UserProfile />} />
//         <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
//       </Routes>
//     );
//   } else {
//     routes = (
//       <Routes>
//         <Route path={ROUTE.HOME} element={<Home />} />
//         <Route path={ROUTE.ITEM(':productId')} element={<ItemPage />} />
//         <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
//         <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
//         <Route path={AUTH_ROUTE.LOGIN_SUCCESS} element={<LoginSuccess />} />
//         <Route path={AUTH_ROUTE.LOGIN_GOOGLE} />
//         <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
//       </Routes>
//     );
//   }
//   return (
//     <div className="App">
//       <AuthContext.Provider
//         value={useMemo(() => ({
//           isLoggedIn: !!token,
//           token,
//           userData,
//           login,
//           logout,
//         }), [token, userData, login, logout])}
//       >
//         <Nav />
//         <Grid mt={3} container justifyContent="center">
//           <Grid item xs={10}>
//             {routes}
//           </Grid>
//         </Grid>
//         <Footer />
//       </AuthContext.Provider>
//     </div>
//   );
// };

// export default App;
