import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  token: null,
  userId: null,
  username: null,
  login: () => {},
  logout: () => {},
});
