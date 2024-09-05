import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  getDistanceFromUser,
  getLocationFromAddress,
} from '../../../utils/locationHelper';
import {AddressType} from '../../types/locationType';
import TextSection from '../Texts/TextSection/TextSection';
import GoogleMapButton from './GoogleMapButton/GoogleMapButton';
import PickingSection from '../../modules/TrocItem/components/PickingSection/PickingSection';
import {TROC_ITEM_PICKING} from '../../modules/TrocItem/types/TrocItemsType';
import {Divider} from 'react-native-paper';
import i18n from '../../utils/i18n';

type Props = {
  address: AddressType;
  displayAddress?: boolean;
  picking?: TROC_ITEM_PICKING;
};

const MyMapView = ({address, displayAddress, picking}: Props) => {
  const {height, width} = useWindowDimensions();

  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const [distance, setDistance] = useState(' ');

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.015;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const loadLocation = useCallback(async () => {
    const {lat, lng} = await getLocationFromAddress(address.formattedAddress);
    if (lat && lng) {
      setLocation({latitude: lat, longitude: lng});
    }

    const itemDistance = await getDistanceFromUser(address.formattedAddress);
    if (itemDistance) {
      setDistance(`${i18n.t('TROC_ITEM_MAP_DISTANCE')} ${itemDistance}`);
    } else {
      setDistance(i18n.t('ALERT_LOCATION'));
    }
  }, [address]);

  useEffect(() => {
    loadLocation();

    return setLocation({latitude: null, longitude: null});
  }, [loadLocation]);

  const {latitude, longitude} = location;
  const shouldDisplayCircle = !displayAddress && latitude && longitude;
  const isMapAvailable = latitude && longitude;

  const renderCircle = useCallback(() => {
    return shouldDisplayCircle ? (
      <Circle
        center={{latitude, longitude}}
        radius={400}
        strokeWidth={0}
        fillColor={'rgba(121, 185, 255, 0.4)'}
      />
    ) : null;
  }, [shouldDisplayCircle, latitude, longitude]);

  const renderGoogleMapButton = useCallback(() => {
    return displayAddress ? (
      <GoogleMapButton formattedAddress={address.formattedAddress} />
    ) : null;
  }, [displayAddress, address.formattedAddress]);

  const renderMap = useCallback(() => {
    return isMapAvailable ? (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
        pitchEnabled={false}
        rotateEnabled={false}
        showsUserLocation>
        {renderCircle()}
      </MapView>
    ) : (
      <View style={styles.map} />
    );
  }, [LONGITUDE_DELTA, isMapAvailable, latitude, longitude, renderCircle]);

  const textAddress = displayAddress
    ? address.formattedAddress
    : i18n.t('TROC_ITEM_MAP_APPROX');

  return (
    <View>
      {renderMap()}
      <TextSection title={distance} subtitle={textAddress} />
      {picking && <PickingSection picking={picking} />}
      <Divider style={styles.divider} />
      {renderGoogleMapButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    borderRadius: 10,
    width: '100%',
    height: 120,
  },
  divider: {
    marginTop: 10,
  },
});

export default memo(MyMapView);
