import { create } from "zustand";

type CardCoordinatesStore = {
  latitude: number;
  longitude: number;
  setCoordinates: (latitude: number, longitude: number) => void;
};

export const useSelectedCardsCoordinates = create<CardCoordinatesStore>(
  (set) => ({
    latitude: 0,
    longitude: 0,
    setCoordinates: (latitude, longitude) => set({ latitude, longitude }),
  })
);
