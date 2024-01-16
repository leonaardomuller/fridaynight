import { create } from "zustand";

export type Event = {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  imagesUrl: string[];
  startsAt: string;
  endsAt: string;
}

type EventsStore = {
  events: Event[];
  setEvents: (events: Event[]) => void;
};

export const useEventsStore = create<EventsStore>(
  (set) => ({
    events: [],
    setEvents: (events) => set({ events }),
  })
);
