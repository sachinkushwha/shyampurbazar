import { useState, useEffect } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (err) => {

        switch (err.code) {

          case 1:
            setError("Location permission denied. Please allow location 📍");
            break;

          case 2:
            setError("Location unavailable. GPS ya internet check kare 📡");
            break;

          case 3:
            setError("Location request timeout. Please try again ⏱️");
            break;

          default:
            setError("Unknown error aayi hai. Please retry");
        }

      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  return { location, error };
}