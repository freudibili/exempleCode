import {useState, useEffect} from 'react';
import Geolocation, {
  GeolocationError,
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {AddressType} from '../App/types/locationType';
import {getAdressFromLocation} from '../utils/locationHelper';

interface Position {
  lat: number;
  lng: number;
}

interface GeolocationData {
  position: Position | null;
  error: GeolocationError | null;
  address: AddressType | null;
}

const defaultOptions = {
  enableHighAccuracy: false,
  timeout: 10000,
};

const useGeolocation = (options?: GeolocationOptions): GeolocationData => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [address, setAddress] = useState<AddressType | null>(null);

  useEffect(() => {
    const successCallback = async (success: GeolocationResponse) => {
      const {latitude, longitude} = success.coords;
      if (latitude && longitude) {
        setPosition({lat: latitude, lng: longitude});
        const formattedAddress = await getAdressFromLocation({
          lng: longitude,
          lat: latitude,
        });
        setAddress({formattedAddress, coordinates: [longitude, latitude]});
      }
    };

    const errorCallback = (err: GeolocationError) => {
      setError(err);
    };

    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options || defaultOptions,
      );
    };

    getCurrentPosition();
  }, [options]);

  return {position, error, address};
};

export default useGeolocation;
