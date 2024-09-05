import React, {useCallback} from 'react';
import {StyleSheet, Linking} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {googleMapLink} from '../../../../utils/locationHelper';
import designSystem from '../../../utils/designSystem';
import i18n from '../../../utils/i18n';

interface Props {
  formattedAddress: string;
}

const GoogleMapButton = ({formattedAddress}: Props) => {
  const openUrl = useCallback(async () => {
    const supportedURL = googleMapLink + formattedAddress;
    const supported = await Linking.canOpenURL(supportedURL);

    if (supported) {
      await Linking.openURL(supportedURL);
    }
  }, [formattedAddress]);

  return (
    <Button
      style={styles.container}
      onPress={openUrl}
      icon={() => (
        <Icon
          name={'map-pin'}
          size={18}
          color={designSystem.theme.colors.primary}
        />
      )}
      contentStyle={styles.contentContainer}>
      {i18n.t('MESSENGER_CHAT_ORDER_GOOGLE_BUTTON')}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contentContainer: {flexDirection: 'row-reverse'},
});

export default GoogleMapButton;
