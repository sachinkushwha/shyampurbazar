import { Navigate } from "react-router-dom";
import useUserLocation from "../hooks/useUserLocation";
import  {getDistance}  from "../utils/Distance";

const vendorLocation = {
  lat: 26.487357,
  lng: 84.291448,
};

export default function LocationGuard({ children }) {

  const { location, error } = useUserLocation();

  if (error) return <p>{error}</p>;

  if (!location) return <p>Checking location...</p>;

  const distance = getDistance(
    location.lat,
    location.lng,
    vendorLocation.lat,
    vendorLocation.lng
  );

  if (distance > 3) {
    return <Navigate to='/service-unavailable' />
  }

  return children;
}