import React, {
  useState,
  memo,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {getMapPreview} from '../../../utils/locationHelper';
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import config from '../../../utils/config';
import {AddressType} from '../../types/locationType';
import designSystem from '../../utils/designSystem';
import {Text} from 'react-native-paper';
import useGeolocation from '../../../hooks/useGeolocation';
import ValidationFormError from '../ValidationFormError/ValidationFormError';
import i18n from '../../utils/i18n';

interface Props {
  getDataCallback: (address: AddressType) => void;
  initValue?: AddressType;
  height?: number;
  title: string;
  error?: string;
}

const LocationPicker = memo(
  ({getDataCallback, initValue, height, title, error}: Props) => {
    const [isfirstOpening, setIsFirstOpening] = useState(true);
    const [location, setLocation] = useState<AddressType | null>();
    const {address, error: errorGeolocation} = useGeolocation();

    const ref =
      useRef<GooglePlacesAutocompleteRef>() as React.MutableRefObject<GooglePlacesAutocompleteRef>;

    const updateToCurrentPosition = useCallback(async () => {
      setLocation(address);
    }, [address]);

    const initLocation = useCallback(() => {
      if (initValue) {
        setLocation(initValue);
        ref.current?.setAddressText(initValue.formattedAddress);
      } else {
        updateToCurrentPosition();
      }
    }, [initValue, updateToCurrentPosition]);

    useEffect(() => {
      initLocation();
    }, [initLocation]);

    useEffect(() => {
      if (location) {
        getDataCallback(location);
      }
    }, [getDataCallback, location]);

    const updateDetails = (details: GooglePlaceDetail) => {
      const longitude = details.geometry.location.lng;
      const latitude = details.geometry.location.lat;
      const formattedAddress = details.formatted_address;

      const newLocation: AddressType = {
        formattedAddress,
        coordinates: [longitude, latitude],
      };

      setLocation(newLocation);
    };

    const handleEmptyText = useCallback(
      (text: string) => {
        if (text.length < 1) {
          if (!isfirstOpening || !initValue) {
            updateToCurrentPosition();
          } else {
            setIsFirstOpening(false);
          }
        }
      },
      [initValue, isfirstOpening, updateToCurrentPosition],
    );

    const GetMapImage = useCallback(() => {
      let locationPreview = errorGeolocation ? (
        <Text>{i18n.t('ALERT_LOCATION')}</Text>
      ) : (
        <Text>{i18n.t('NO_LOCATION')}</Text>
      );

      if (location?.coordinates) {
        const lng = location.coordinates[0];
        const lat = location.coordinates[1];

        const coordinates = {lng, lat};

        locationPreview = (
          <Image
            style={styles.image}
            source={{
              uri: getMapPreview(coordinates),
            }}
          />
        );
      }
      return locationPreview;
    }, [errorGeolocation, location]);

    const autoCompleteHeight = useMemo(() => {
      if (height) {
        return height + 60;
      }
      return 230;
    }, [height]);
    return (
      <View>
        <Text
          style={[styles.title, {color: designSystem.theme.colors.outline}]}
          variant={'titleMedium'}>
          {title}
        </Text>
        <View style={[styles.autoComplete, {height: autoCompleteHeight}]}>
          <GooglePlacesAutocomplete
            ref={ref}
            styles={{
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              description: styles.description,
            }}
            placeholder={i18n.t('GENERAL_LOCATION_PICKER_PLACEHOLDER')}
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}
            debounce={500}
            onPress={(data, details = null) => {
              if (details) {
                updateDetails(details);
              }
            }}
            numberOfLines={3}
            textInputProps={{
              onChangeText: handleEmptyText,
              placeholderTextColor: designSystem.theme.colors.onSurfaceDisabled,
            }}
            query={{
              key: config.GOOGLE_API_KEY,
              language: 'en',
              radius: 30000,
              location: `${location?.coordinates[1]}, ${location?.coordinates[0]}`,
            }}
          />
        </View>
        <View style={[{height: height ?? 200}, styles.mapPreView]}>
          <GetMapImage />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <ValidationFormError error={error} />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  autoComplete: {
    width: '100%',
    position: 'absolute',
    zIndex: 100,
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: designSystem.theme.colors.outline,
  },
  textInput: {
    marginTop: 5,
    marginHorizontal: 5,
    color: designSystem.theme.colors.onSurface,
  },
  description: {color: designSystem.theme.colors.onSurface},
  mapPreView: {
    width: '100%',
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designSystem.theme.colors.surface,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    top: -12,
    left: 10,
    backgroundColor: designSystem.theme.colors.background,
    paddingHorizontal: 5,
    zIndex: 1000,
  },
  errorContainer: {
    marginTop: 10,
  },
});

export default LocationPicker;
