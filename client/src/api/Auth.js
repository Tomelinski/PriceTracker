import { api } from './Config';
import { SERVER_ROUTE } from './Constants';

export const loginUser = async (credentials) => {
  return api.post(SERVER_ROUTE.AUTH.LOGIN, credentials).then((response) => response.data);
};

export const getGoogleUser = async () => {
  return api.get(SERVER_ROUTE.AUTH.USER, { withCredentials: true }).then((response) => response.data);
};

export const registerUser = async (userData) => {
  return api.post(SERVER_ROUTE.AUTH.REGISTER, userData);
  // return api.post(SERVER_ROUTE.REGISTER, userData).then((response) => response.data);
};

export const logout = async () => {
    return api.get(SERVER_ROUTE.AUTH.LOGOUT);
}