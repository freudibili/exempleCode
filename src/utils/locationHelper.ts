import Geolocation from '@react-native-community/geolocation';
import config from './config';
import i18n from '../App/utils/i18n';

export const googleMapLink = 'https://maps.google.com/?q=';
const staticMapApi = 'https://maps.googleapis.com/maps/api/staticmap';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';
const distanceMatrix =
  'https://maps.googleapis.com/maps/api/distancematrix/json';

export const LOCATION_DISTANCE_DEFAULT = 100;
export const getCurrentPosition = async (): Promise<{
  lat: number;
  lng: number;
}> => {
  return new Promise(function (resolve, reject) {
    const options = {
      enableHighAccuracy: false,
      timeout: 2000,
    };

    Geolocation.getCurrentPosition(
      success => {
        const {latitude, longitude} = success.coords;
        if (latitude && longitude) {
          resolve({lat: latitude, lng: longitude});
        }
        reject({message: i18n.t('LOCATION_PICKER_POSITION_NOT_FOUND')});
      },
      error => {
        reject(error);
      },
      options,
    );
  });
};

export const getMapPreview = (coordinates: {lng: number; lat: number}) => {
  const {lat} = coordinates;
  const {lng} = coordinates;
  const imagePreviewUrl = `${staticMapApi}?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${config.GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export const getAdressFromLocation = async (coordinates: {
  lng: number;
  lat: number;
}): Promise<string> => {
  const url = `${geocodeJson}?latlng=${coordinates.lat},${coordinates.lng}&key=${config.GOOGLE_API_KEY}`;
  const response = await fetch(url);
  const address = await response.json();

  if (address.results[0]) {
    return address.results[0].formatted_address;
  }
  return '';
};
export const getLocationFromAddress = async (address: string) => {
  const url = `${geocodeJson}?key=${config.GOOGLE_API_KEY}&address=${address}`;
  const response = await fetch(url);
  const location = await response.json();

  if (location) {
    if (location.results[0]) {
      const {lat, lng} = location.results[0].geometry?.location;
      return {lat, lng};
    }
  }

  return {lat: null, lng: null};
};

export const getDistanceFromUser = async (address: string) => {
  try {
    const {lat, lng} = await getCurrentPosition();

    const origin = `${lat},${lng}`;
    const destinations = `${address}`;

    const url = `${distanceMatrix}?key=${config.GOOGLE_API_KEY}&origins=${origin}&destinations=${destinations}`;
    const response = await fetch(url);
    const distance = await response.json();
    if (distance) {
      return distance.rows[0]?.elements[0]?.distance?.text;
    }
  } catch (err) {
    return null;
  }
};
