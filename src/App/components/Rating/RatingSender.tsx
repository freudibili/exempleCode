import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Rate from 'react-native-rate';
import PrimaryButton from '../Buttons/PrimaryButton/PrimaryButton';
import i18n from '../../utils/i18n';
import config from '../../../utils/config';

interface Props {
  onComplete: () => void;
}
const RatingSender = ({onComplete}: Props) => {
  const options = {
    AppleAppID: config.IOS_APP_ID,
    GooglePackageName: config.ANDROID_PACKAGE_NAME,
    OtherAndroidURL: config.ANDROID_STORE_URL,
    preferInApp: false,
    openAppStoreIfInAppFails: true,
  };

  const sendFeedBack = () => {
    Rate.rate(options, (success, errorMessage) => {
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        console.log(success);
      }
      if (errorMessage) {
        // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
        console.error(`Example page Rate.rate() error: ${errorMessage}`);
      }
    });
    onComplete();
  };

  const storeLabel =
    Platform.OS === 'ios' ? i18n.t('APP_STORE') : i18n.t('GOOGLE_PLAY_STORE');
  return (
    <>
      <View style={styles.container}>
        <PrimaryButton
          onPress={sendFeedBack}
          label={i18n.t('APP_RATING_RATING_BUTTON') + storeLabel}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  text: {textAlign: 'center', marginTop: 20},
});

export default RatingSender;
