export interface Event {
  name: string;
  genre: string;
  popularity: number;
  date: string;
  venue: string;
  description: string;
  organizer: string;
  price: string;
  contact: string;
  url: string;
  image: string;
  artists: string[];
  duration: string;
  ageRestriction: string;
  accessibilityFeatures: string;
}

export type Events = Event[];
