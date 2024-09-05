import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import MySnackBar from '../MySnackBar/MySnackBar';
import {hideSnackBarAlertRequest} from '../../models/notificationActions';
import {
  getSnackBarAlert,
  getSnackBarAlertIsOpen,
} from '../../models/notificationSelectors';

const SnackBar = () => {
  const isOpen = useAppSelector(getSnackBarAlertIsOpen);
  const notification = useAppSelector(getSnackBarAlert);

  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(hideSnackBarAlertRequest());
  }, [dispatch]);

  const GetSnackBar = useCallback(() => {
    if (isOpen) {
      return (
        <View style={styles.container}>
          <MySnackBar
            notification={notification}
            getDismissCallback={handleClose}
          />
        </View>
      );
    }
    return null;
  }, [handleClose, isOpen, notification]);

  return <GetSnackBar />;
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
  },
});

export default SnackBar;
