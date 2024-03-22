// Routes.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/home";
import { ItemPage } from "./components/item/Page";
import { UserProfile } from "./components/user/profile";
import { Login, Register, LoginSuccess } from "./components/auth";
import { AUTH_ROUTE, ROUTE } from './constants/Constants';
import useAuth from "./hooks/useAuth";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthChecked(true);
  }, [isLoggedIn]);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<Home />} />
      <Route path={ROUTE.ITEM(':productId')} element={<ItemPage />} />
      {isLoggedIn ? (
        <>
          <Route path={AUTH_ROUTE.LOGIN_SUCCESS} element={<LoginSuccess />} />
          <Route path={ROUTE.USER(':userId')} element={<UserProfile />} />
          <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
        </>
      ) : (
        <>
          <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
          <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
          <Route path={AUTH_ROUTE.LOGIN_SUCCESS} element={<LoginSuccess />} />
          <Route path={AUTH_ROUTE.LOGIN_GOOGLE} />
          <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
        </>
      )}
    </Routes>
  );
};
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

export default AppRoutes;
