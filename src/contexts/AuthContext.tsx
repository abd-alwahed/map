import { User } from "../types/Auth";
import { createContext, useContext } from "react";
type AuthContextType = {
  user?: User;
  isLoading: boolean;
  setUser: (user: User) => void;
};
export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
