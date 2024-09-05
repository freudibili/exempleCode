import {Platform, Linking, View, StyleSheet} from 'react-native';
import React from 'react';
import config from '../../utils/config';
import {Button, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../utils/designSystem';
import {getHeight} from '../utils/responsiveHelper';
import i18n from '../utils/i18n';

const ForceUpdateScreen = () => {
  const forceUpdate = () => {
    // Platform-specific URL
    const storeUrl =
      Platform.OS === 'ios' ? config.IOS_STORE_URL : config.ANDROID_STORE_URL;

    // Open the store URL
    Linking.openURL(storeUrl).catch(err =>
      console.error('An error occurred while opening the store URL:', err),
    );
  };

  return (
    <View style={designSystem.styles.customStyle.container}>
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <Icon
            size={getHeight / 8}
            name={'check-circle'}
            color={designSystem.theme.colors.tertiary}
            style={styles.icon}
          />
          <Text style={styles.heading} variant={'headlineMedium'}>
            {i18n.t('FORCE_UPDATE_TITLE')}
          </Text>
          <Text variant={'bodyMedium'} style={styles.description}>
            {i18n.t('FORCE_UPDATE_DESCRIPTION')}
          </Text>
        </View>
        <Button mode={'contained'} onPress={forceUpdate} style={styles.button}>
          {i18n.t('FORCE_UPDATE_BUTTON')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  topContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 60,
  },
  heading: {
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
  },
  button: {
    textAlign: 'center',
    marginVertical: 60,
  },
});

export default ForceUpdateScreen;
