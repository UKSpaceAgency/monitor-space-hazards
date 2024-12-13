declare module 'cityjs' {
type City = {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
  distance: number;
};

export function nearestCity(coords: { latitude: number; longitude: number }): City;
}
