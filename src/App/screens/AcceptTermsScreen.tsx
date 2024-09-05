import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {Button, Text, Switch} from 'react-native-paper';
import {useAppDispatch} from '../../hooks/reduxHook';
import {setTermsAccepted} from '../models/appActions';
import designSystem from '../utils/designSystem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigateWhenAuth} from '../utils/navigationHelper';
import {AuthStackParamList, NAVIGATION} from '../types/navigationTypes';
import {RouteProp, useRoute} from '@react-navigation/native';
import i18n from '../utils/i18n';

type routeType = RouteProp<AuthStackParamList, NAVIGATION.ACCEPT_TERMS_SCREEN>;
const AcceptTermsScreen = () => {
  const {params} = useRoute<routeType>();
  const insets = useSafeAreaInsets();

  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);

  const dispatch = useAppDispatch();

  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
  const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);

  const handleConfirm = () => {
    dispatch(setTermsAccepted());
    navigateWhenAuth(params);
  };

  const openPrivacyPolicy = () => {
    Linking.openURL(i18n.t('TERMS_PRIVACY_POLICY_LINK'));
  };

  const openTermsAndConditions = () => {
    Linking.openURL(i18n.t('TERMS_TERMS_AND_CONDITIONS_LINK'));
  };

  const enableButton = useMemo(() => {
    return isSwitchOn1 && isSwitchOn2;
  }, [isSwitchOn1, isSwitchOn2]);

  return (
    <View style={[designSystem.styles.customStyle.container]}>
      <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <Text variant={'headlineLarge'}>{i18n.t('TERMS_TITLE')}</Text>
          <Text variant={'bodyLarge'} style={styles.text}>
            {i18n.t('TERMS_IMPORTANCE')}
          </Text>
          <Text variant={'bodyLarge'} style={styles.text}>
            {i18n.t('TERMS_COMMUNICATION')}
          </Text>
          <Text variant={'bodyLarge'} style={styles.text}>
            {i18n.t('TERMS_MEETINGS')}
          </Text>
          <Text variant={'bodyLarge'} style={styles.text}>
            {i18n.t('TERMS_ATMOSPHERE')}
          </Text>
        </View>
        <View
          style={[styles.actionContainer, {paddingBottom: insets.bottom + 10}]}>
          <View style={styles.switchContainer}>
            <Switch
              value={isSwitchOn1}
              onValueChange={onToggleSwitch1}
              style={styles.switchButton}
            />
            <Text style={styles.switchText}>
              {i18n.t('TERMS_SWITCH_LABEL_1')}
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={isSwitchOn2}
              onValueChange={onToggleSwitch2}
              style={styles.switchButton}
            />
            <Text style={styles.switchText}>
              {i18n.t('TERMS_SWITCH_LABEL_2_1')}
              <Text style={styles.link} onPress={openPrivacyPolicy}>
                {i18n.t('TERMS_PRIVACY_POLICY')}
              </Text>
              {i18n.t('TERMS_SWITCH_LABEL_2_2')}
              <Text style={styles.link} onPress={openTermsAndConditions}>
                {i18n.t('TERMS_TERMS_AND_CONDITIONS')}
              </Text>
            </Text>
          </View>
          <Button
            mode={'contained'}
            style={styles.confirmButton}
            disabled={!enableButton}
            onPress={handleConfirm}>
            Confirmer
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
  },
  text: {
    marginTop: 20,
  },
  actionContainer: {
    backgroundColor: designSystem.theme.colors.primaryContainer,
    paddingHorizontal: 20,
    ...designSystem.styles.customStyle.shadow,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  switchButton: {
    marginRight: 10,
  },
  switchText: {
    flex: 1,
  },
  confirmButton: {marginVertical: 20},
  link: {
    color: designSystem.theme.colors.primary,
  },
});

export default AcceptTermsScreen;
