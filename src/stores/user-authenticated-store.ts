import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";

type UserAuthenticatedStore = {
  user: FirebaseAuthTypes.User;
  setUser: (value: FirebaseAuthTypes.User) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const useUserAuthenticatedStore = create<UserAuthenticatedStore>(
  (set) => ({
    user: null,
    setUser: (value) => set({ user: value }),
    isAuthenticated: false,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  })
);
