import { create } from "zustand";

type LocationDetails = {
  country_state: string;
  city: string;
  country: string;
  country_code: string;
  neighbourhood?: string;
  postcode: string;
  railway?: string;
  road: string;
  state: string;
};

type MyCurrentLocationStore = LocationDetails & {
  setMyCurrentLocation: (location: LocationDetails) => void;
};

export const useMyCurrentLocationStore = create<MyCurrentLocationStore>((set) => ({
  country_state: '',
  city: '',
  country: '',
  country_code: '',
  neighbourhood: '',
  postcode: '',
  railway: '',
  road: '',
  state: '',
  setMyCurrentLocation: (location: LocationDetails) => set(location),
}));
