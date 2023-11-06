import { create } from "zustand";

type Interest = {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  startsAt: string;
  endsAt: string;
}

type InterestsStore = {
  interests: Interest[];
  setInterests: (interests: Interest[]) => void;
};

export const useInterestsStore = create<InterestsStore>(
  (set) => ({
    interests: [],
    setInterests: (interests) => set({ interests }),
  })
);
