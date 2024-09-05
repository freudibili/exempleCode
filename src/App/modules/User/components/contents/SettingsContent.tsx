import React, {useCallback} from 'react';
import {Alert, StyleSheet, View, Text} from 'react-native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {useAppDispatch} from '../../../../../hooks/reduxHook';
import designSystem from '../../../../utils/designSystem';
import {
  deleteAccountRequest,
  logoutRequest,
} from '../../../Auth/models/authActions';
import DeviceInfo from 'react-native-device-info';
import i18n from '../../../../utils/i18n';
import {navigate} from '../../../../utils/navigationHelper';
import {NAVIGATION} from '../../../../types/navigationTypes';

const SettingsContent = () => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  const handleDeleteAccount = useCallback(() => {
    dispatch(deleteAccountRequest());
  }, [dispatch]);

  const handleDeleteProfile = useCallback(() => {
    Alert.alert(
      `${i18n.t('SETTINGS_DELETE_ACCOUNT_ALERT')}`,
      i18n.t('SETTINGS_DELETE_ACCOUNT_ALERT_DESCRIPTION'),
      [
        {
          text: i18n.t('GENERAL_CANCEL_BUTTON'),
          style: 'cancel',
        },
        {
          text: i18n.t('SETTINGS_DELETE_ACCOUNT_BUTTON'),
          onPress: () => handleDeleteAccount(),
        },
      ],
    );
  }, [handleDeleteAccount]);

  const handleContactUs = useCallback(() => {
    navigate({screen: NAVIGATION.CONTACT_US_SCREEN});
  }, []);

  return (
    <View
      style={[
        styles.container,
        designSystem.styles.customStyle.containerVariant,
      ]}>
      <List.Section>
        <List.Item
          style={styles.item}
          title={i18n.t('APP_CONTACT_US')}
          left={() => (
            <List.Icon
              style={styles.button}
              icon={() => (
                <Icon
                  name={'mail'}
                  size={20}
                  color={designSystem.theme.colors.onSurfaceDisabled}
                />
              )}
            />
          )}
          onPress={handleContactUs}
        />
        <List.Item
          style={styles.item}
          title={i18n.t('SETTINGS_LOGOUT_BUTTON')}
          left={() => (
            <List.Icon
              style={styles.button}
              icon={() => (
                <Icon
                  name={'log-out'}
                  size={20}
                  color={designSystem.theme.colors.onSurfaceDisabled}
                />
              )}
            />
          )}
          onPress={handleLogout}
        />
        <List.Item
          style={styles.item}
          title={i18n.t('SETTINGS_DELETE_ACCOUNT_BUTTON')}
          left={() => (
            <List.Icon
              style={styles.button}
              icon={() => (
                <Icon
                  name={'user-x'}
                  size={20}
                  color={designSystem.theme.colors.onSurfaceDisabled}
                />
              )}
            />
          )}
          onPress={handleDeleteProfile}
        />
      </List.Section>
      <View style={styles.appVersionContainer}>
        <Text style={styles.appVersionText}>
          {`${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'space-between', flex: 1},
  item: {paddingHorizontal: 20},
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designSystem.theme.colors.surfaceDisabled,
    borderRadius: 10,
    padding: 10,
  },
  appVersionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appVersionText: {
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
});

export default SettingsContent;
