import { api } from './Config';
import { SERVER_ROUTE } from '../constants/Constants';

export const loginUser = async (credentials) => {
  console.log();
  return api.post(SERVER_ROUTE.AUTH.LOGIN, credentials)
    .then((response) => response.data);
};

export const getGoogleUser = async () => {
  console.log();
  return api.get(SERVER_ROUTE.AUTH.USER, { withCredentials: true })
    .then((response) => response.data);
};

export const registerUser = async (userData) => {
  console.log();
  return api.post(SERVER_ROUTE.AUTH.REGISTER, userData);
  // return api.post(SERVER_ROUTE.REGISTER, userData).then((response) => response.data);
};

export const logout = async () => {
  console.log();
  return api.get(SERVER_ROUTE.AUTH.LOGOUT);
};
