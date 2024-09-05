import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import StatusLoader from '../../../../../components/StatusLoader/StatusLoader';
import {
  getUserTrocItems,
  getUserTrocItemsStatus,
} from '../../../../User/models/user/userSelectors';
import {CardTrocItemType, TROC_ITEM_STATUS} from '../../../types/TrocItemsType';
import TrocItemPickerCardItem from './TrocItemPickerCardItem/TrocItemPickerCardItem';
import {STATUS} from '../../../../../types/storeTypes';
import i18n from '../../../../../utils/i18n';

interface Props {
  selectItemCallback: (trocItem: CardTrocItemType) => void;
}

const TrocItemPickerCardItems = ({selectItemCallback}: Props) => {
  const items = useAppSelector(getUserTrocItems);
  const status = useAppSelector(getUserTrocItemsStatus);

  if (items.length < 1 && status !== STATUS.READY) {
    return (
      <Text style={styles.emptyText}>
        {i18n.t('TROC_ITEM_NEGOCIATE_ADD_TROC_ITEM_EMPTY')}
      </Text>
    );
  }

  const availableItems = items.filter(
    item => item.status !== TROC_ITEM_STATUS.COMPLETED,
  );

  return (
    <View style={[styles.container]}>
      <StatusLoader status={status}>
        <FlatList
          data={availableItems}
          columnWrapperStyle={styles.content}
          numColumns={2}
          renderItem={({item}) => (
            <TrocItemPickerCardItem
              key={item.id}
              trocItem={item}
              selectItemCallback={selectItemCallback}
            />
          )}
        />
      </StatusLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {justifyContent: 'space-between'},
  emptyText: {textAlign: 'center'},
});
export default TrocItemPickerCardItems;
