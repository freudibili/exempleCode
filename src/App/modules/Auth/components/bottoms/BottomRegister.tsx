import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {NAVIGATION} from '../../../../types/navigationTypes';
import designSystem from '../../../../utils/designSystem';
import {navigate} from '../../../../utils/navigationHelper';
import i18n from '../../../../utils/i18n';

const BottomRegister = () => {
  const goToLogin = () => {
    navigate({screen: NAVIGATION.LOGIN_SCREEN});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{i18n.t('AUTH_REGISTER_GO_TO_TEXT')}</Text>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.button}>
          {i18n.t('AUTH_REGISTER_GO_TO_BUTTON')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {color: designSystem.theme.colors.onSurfaceDisabled},
  button: {color: designSystem.theme.colors.secondary, fontWeight: '700'},
});
export default BottomRegister;
