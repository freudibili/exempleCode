import React, {useCallback} from 'react';
import BottomSheet from '../../../../components/BottomSheet/BottomSheet';
import {Alert, StyleSheet, View} from 'react-native';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../../utils/designSystem';
import {useAppDispatch} from '../../../../../hooks/reduxHook';

import {RouteProp, useRoute} from '@react-navigation/native';
import {
  NAVIGATION,
  UserStackParamList,
} from '../../../../types/navigationTypes';
import {cancelOrderRequest} from '../../../Order/models/orderActions';
import {useBottomSheet} from '../../../../utils/BottomSheetContext';
import i18n from '../../../../utils/i18n';

type routeType = RouteProp<
  UserStackParamList,
  NAVIGATION.USER_TROC_ITEM_ACTIONS_MODAL
>;

const UserOrderActionsModal = () => {
  const {closeBottomSheet} = useBottomSheet();
  const dispatch = useAppDispatch();

  const {params} = useRoute<routeType>();
  const {id} = params;

  const showAlert = () =>
    Alert.alert(
      `${i18n.t('USER_PROFILE_CANCEL_ORDER_TITLE')}`,
      i18n.t('USER_PROFILE_CANCEL_ORDER_DESCRIPTION'),
      [
        {
          text: i18n.t('GENERAL_CANCEL_BUTTON'),
          onPress: () => closeBottomSheet(),
          style: 'cancel',
        },
        {
          text: i18n.t('USER_PROFILE_CANCEL_ORDER_BUTTON'),
          onPress: () => cancelOrder(),
        },
      ],
    );

  const cancelOrder = useCallback(() => {
    dispatch(cancelOrderRequest(id));
    closeBottomSheet();
  }, [closeBottomSheet, dispatch, id]);

  return (
    <BottomSheet>
      <Menu.Item
        leadingIcon={() => (
          <View style={styles.iconContainer}>
            <Icon
              name={'slash'}
              color={designSystem.theme.colors.onSurface}
              size={16}
            />
          </View>
        )}
        onPress={showAlert}
        title={i18n.t('USER_PROFILE_CANCEL_ORDER_BUTTON')}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});

export default UserOrderActionsModal;
