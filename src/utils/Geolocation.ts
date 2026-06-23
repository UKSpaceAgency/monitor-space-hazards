export type UserLocation = {
  longitude: number;
  latitude: number;
};

export function getUserLocation(options?: PositionOptions): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => resolve({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      }),
      error => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 0,
        ...options,
      },
    );
  });
}
