import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';
import {
  SnackBarAlertType,
  SNACK_BAR_ALERT,
} from '../../../../../types/snackBarType';
import designSystem from '../../../../utils/designSystem';
import i18n from '../../../../utils/i18n';

interface Props {
  notification: SnackBarAlertType;
  getDismissCallback: () => void;
}

const MySnackBar = ({notification, getDismissCallback}: Props) => {
  const [visible, setVisible] = useState(true);

  const onDismissSnackBar = () => {
    getDismissCallback();
    setVisible(false);
  };

  let snackBarStyle = styles.snackbarDefault;
  let textType = null;

  switch (notification.type) {
    case SNACK_BAR_ALERT.ERROR: {
      snackBarStyle = styles.snackbarError;
      textType = (
        <Text style={styles.textError} variant={'labelLarge'}>
          {i18n.t('NOTIFICATION_ERROR')}
        </Text>
      );
      break;
    }
    case SNACK_BAR_ALERT.SUCCESS: {
      snackBarStyle = styles.snackbarSuccess;
      textType = (
        <Text style={styles.textSuccess} variant={'labelLarge'}>
          {i18n.t('NOTIFICATION_SUCCESS')}
        </Text>
      );
      break;
    }
    default: {
    }
  }
  return (
    <Snackbar
      style={snackBarStyle}
      visible={visible}
      duration={2000}
      onDismiss={onDismissSnackBar}>
      <View style={styles.textContainer}>
        {textType}
        <Text style={styles.message} variant={'bodyMedium'}>
          {notification.message}
        </Text>
      </View>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbarDefault: {
    backgroundColor: designSystem.theme.colors.surfaceVariant,
  },
  snackbarError: {
    backgroundColor: '#ffd5d5',
  },
  snackbarSuccess: {
    backgroundColor: '#B2edc3',
  },

  textError: {
    color: 'red',
    fontWeight: 'bold',
  },
  textSuccess: {
    color: 'green',
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {marginHorizontal: 10, flex: 1},
});

export default MySnackBar;
