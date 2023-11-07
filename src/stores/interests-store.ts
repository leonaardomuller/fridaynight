import { create } from "zustand";

type Interest = {
  id: string;
  title: string;
  gender: string;
  imageUrl: string[];
  followers: any[];
  description: string;
  latitude: number;
  longitude: number;
  startsAt: string;
  endsAt: string;
};

type InterestsStore = {
  interests: Interest[];
  setInterests: (interests: Interest[]) => void;
};

export const useInterestsStore = create<InterestsStore>((set) => ({
  interests: [],
  setInterests: (interests) => set({ interests }),
}));
