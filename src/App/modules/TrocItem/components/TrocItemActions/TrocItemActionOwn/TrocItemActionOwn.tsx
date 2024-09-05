import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {NAVIGATION} from '../../../../../types/navigationTypes';
import {navigate} from '../../../../../utils/navigationHelper';
import {TrocItemType} from '../../../types/TrocItemsType';
import i18n from '../../../../../utils/i18n';

interface Props {
  trocItem: TrocItemType;
}
const TrocItemActionOwn = ({trocItem}: Props) => {
  const openUpdateProductModal = useCallback(() => {
    const params = {
      id: trocItem._id,
    };
    navigate({screen: NAVIGATION.TROC_ITEM_UPDATE_PRODUCT_SCREEN, params});
  }, [trocItem]);
  return (
    <View>
      <Button mode="contained" onPress={openUpdateProductModal}>
        {i18n.t('TROC_ITEM_ACTION_UPDATE_BUTTON')}
      </Button>
    </View>
  );
};

export default TrocItemActionOwn;
