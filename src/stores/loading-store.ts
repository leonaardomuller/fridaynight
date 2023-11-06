import { create } from "zustand";

type LoadingStore = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));
