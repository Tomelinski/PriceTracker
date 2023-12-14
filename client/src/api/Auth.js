import { api } from './Config';
import { SERVER_ROUTE } from './Constants';

export const loginUser = async (credentials) => {
  return api.post(SERVER_ROUTE.LOGIN, credentials).then((response) => response.data);
};

export const getGoogleUser = async () => {
  return api.get(SERVER_ROUTE.USER, { withCredentials: true }).then((response) => response.data);
};

export const registerUser = async (userData) => {
  return api.post(SERVER_ROUTE.REGISTER, userData);
  // return api.post(SERVER_ROUTE.REGISTER, userData).then((response) => response.data);
};

export const logout = async () => {
    return api.get(SERVER_ROUTE.LOGOUT);
}