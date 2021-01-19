export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  username: string;
  avatar: string;
  gender: Gender;
  age: number;
  fullName: string;
}

export interface Geolocation {
  country: string;
  state: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
}
