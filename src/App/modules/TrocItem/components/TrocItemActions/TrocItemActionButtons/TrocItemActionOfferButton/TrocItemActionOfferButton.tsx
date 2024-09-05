import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppSelector} from '../../../../../../../hooks/reduxHook';
import {NAVIGATION} from '../../../../../../types/navigationTypes';
import {navigate} from '../../../../../../utils/navigationHelper';
import {getUserWallet} from '../../../../../User/models/user/userSelectors';

import {
  TROC_ITEM_ACTIONS,
  TROC_ITEM_TROC_TYPE,
} from '../../../../types/TrocItemsType';
import i18n from '../../../../../../utils/i18n';

type Props = {
  price: number;
  trocType: TROC_ITEM_TROC_TYPE;
};

const TrocItemActionOfferButton = ({price, trocType}: Props) => {
  const wallet = useAppSelector(getUserWallet);

  const openActionsModal = () => {
    navigate({
      screen: NAVIGATION.TROC_ITEM_ACTIONS_MODAL,
      params: {actionType: TROC_ITEM_ACTIONS.OFFER},
    });
  };

  const text = useMemo(() => {
    return trocType === TROC_ITEM_TROC_TYPE.OFFER_ID
      ? i18n.t('TROC_ITEM_ASK_BUTTON')
      : i18n.t('TROC_ITEM_OFFER_BUTTON');
  }, [trocType]);

  const buyButtonDisabled = useMemo(() => price > wallet, [price, wallet]);

  return (
    <View>
      <Button
        contentStyle={styles.button}
        onPress={openActionsModal}
        mode="contained-tonal"
        disabled={buyButtonDisabled}>
        {`${text}`}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {flexDirection: 'row-reverse'},
});

export default memo(TrocItemActionOfferButton);
