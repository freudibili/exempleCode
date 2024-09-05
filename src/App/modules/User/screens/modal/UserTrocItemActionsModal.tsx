import React, {useCallback} from 'react';
import BottomSheet from '../../../../components/BottomSheet/BottomSheet';
import {Alert, StyleSheet, View} from 'react-native';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../../utils/designSystem';
import {useAppDispatch} from '../../../../../hooks/reduxHook';
import {updateTrocItemStatusRequest} from '../../../TrocItem/models/trocItemActions';
import {TROC_ITEM_STATUS} from '../../../TrocItem/types/TrocItemsType';
import {deleteUserTrocItemRequest} from '../../models/user/userActions';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  NAVIGATION,
  UserStackParamList,
} from '../../../../types/navigationTypes';
import {useBottomSheet} from '../../../../utils/BottomSheetContext';
import i18n from '../../../../utils/i18n';

type routeType = RouteProp<
  UserStackParamList,
  NAVIGATION.USER_TROC_ITEM_ACTIONS_MODAL
>;

const UserTrocItemActionsModal = () => {
  const {closeBottomSheet} = useBottomSheet();
  const dispatch = useAppDispatch();

  const {params} = useRoute<routeType>();
  const {id, status} = params;

  const toggleTrocItemEnabled = useCallback(() => {
    const newStatus =
      status === TROC_ITEM_STATUS.DISABLED
        ? TROC_ITEM_STATUS.ENABLED
        : TROC_ITEM_STATUS.DISABLED;

    dispatch(updateTrocItemStatusRequest(id, newStatus));
    closeBottomSheet();
  }, [closeBottomSheet, dispatch, id, status]);

  const completeTrocItem = useCallback(() => {
    dispatch(updateTrocItemStatusRequest(id, TROC_ITEM_STATUS.COMPLETED));
    closeBottomSheet();
  }, [closeBottomSheet, dispatch, id]);

  const deleteTrocItem = useCallback(() => {
    dispatch(deleteUserTrocItemRequest(id));
    closeBottomSheet();
  }, [closeBottomSheet, dispatch, id]);

  const completeItemAlert = {
    title: i18n.t('USER_PROFILE_COMPLETE_ITEM_TITLE'),
    description: i18n.t('USER_PROFILE_COMPLETE_ITEM_DESCRIPTION'),
    button: i18n.t('USER_PROFILE_COMPLETE_ITEM_BUTTON'),
    onPress: completeTrocItem,
  };

  const deleteItemAlert = {
    title: i18n.t('USER_PROFILE_DELETE_ITEM_TITLE'),
    description: i18n.t('USER_PROFILE_DELETE_ITEM_DESCRIPTION'),
    button: i18n.t('USER_PROFILE_DELETE_ITEM_BUTTON'),
    onPress: deleteTrocItem,
  };

  const showAlert = (alert: {
    title: string;
    description: string;
    button: string;
    onPress: () => void;
  }) =>
    Alert.alert(alert.title, alert.description, [
      {
        text: i18n.t('GENERAL_CANCEL_BUTTON'),
        onPress: () => closeBottomSheet(),
        style: 'cancel',
      },
      {
        text: alert.button,
        onPress: alert.onPress,
      },
    ]);

  return (
    <BottomSheet>
      <>
        {status !== TROC_ITEM_STATUS.COMPLETED && (
          <Menu.Item
            leadingIcon={() => (
              <View style={styles.iconContainer}>
                <Icon
                  name={
                    status === TROC_ITEM_STATUS.DISABLED ? 'eye' : 'eye-off'
                  }
                  size={16}
                  color={designSystem.theme.colors.onSurface}
                />
              </View>
            )}
            onPress={toggleTrocItemEnabled}
            title={
              status === TROC_ITEM_STATUS.DISABLED
                ? i18n.t('USER_PROFILE_ON_ENABLE_ITEM_BUTTON')
                : i18n.t('USER_PROFILE_ON_DISABLE_ITEM_BUTTON')
            }
          />
        )}
        {status !== TROC_ITEM_STATUS.COMPLETED && (
          <Menu.Item
            leadingIcon={() => (
              <View style={styles.iconContainer}>
                <Icon
                  name={'check'}
                  color={designSystem.theme.colors.onSurface}
                  size={16}
                />
              </View>
            )}
            onPress={() => {
              showAlert(completeItemAlert);
            }}
            title={i18n.t('USER_PROFILE_COMPLETE_ITEM_BUTTON')}
          />
        )}
        <Menu.Item
          leadingIcon={() => (
            <View style={styles.iconContainer}>
              <Icon
                name={'trash-2'}
                color={designSystem.theme.colors.onSurface}
                size={16}
              />
            </View>
          )}
          onPress={() => {
            showAlert(deleteItemAlert);
          }}
          title={i18n.t('USER_PROFILE_DELETE_ITEM_BUTTON')}
        />
      </>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});

export default UserTrocItemActionsModal;
