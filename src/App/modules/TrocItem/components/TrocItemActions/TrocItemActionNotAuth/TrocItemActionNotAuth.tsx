import React, {useCallback} from 'react';
import {Button} from 'react-native-paper';
import {STACK} from '../../../../../types/navigationTypes';
import {navigate} from '../../../../../utils/navigationHelper';
import {AUTH_DESTINATION_SCREEN} from '../../../../Auth/utils/authTypes';
import i18n from '../../../../../utils/i18n';

const TrocItemActionNotAuth = () => {
  const openUpdateProductModal = useCallback(() => {
    const params = {
      destination: AUTH_DESTINATION_SCREEN.TROC_ITEM,
    };
    navigate({screen: STACK.AUTH_STACK, params});
  }, []);
  return (
    <Button mode="contained" onPress={openUpdateProductModal}>
      {i18n.t('TROC_ITEM_ACTION_LOGIN_BUTTON')}
    </Button>
  );
};

export default TrocItemActionNotAuth;
