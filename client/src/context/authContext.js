import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
