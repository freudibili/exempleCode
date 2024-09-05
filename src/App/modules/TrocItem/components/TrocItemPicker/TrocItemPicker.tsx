import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionButton from '../../../../components/Buttons/ActionButton/ActionButton';
import {CardTrocItemType} from '../../types/TrocItemsType';
import AddTrocItemModal from './AddTrocItemModal/AddTrocItemModal';
import TrocItemSelected from './TrocItemSelected/TrocItemSelected';
import {FlatList} from 'react-native';
import i18n from '../../../../utils/i18n';

interface Props {
  selectItemsCallback: (trocItems?: CardTrocItemType[]) => void;
}

const TrocItemPicker = ({selectItemsCallback}: Props) => {
  const [selectedItems, setSelectedItems] = useState<CardTrocItemType[]>([]);
  const [visibleAddModal, setVisibleAddModal] = useState(false);

  const showAddModal = () => setVisibleAddModal(true);
  const hideAddModal = () => setVisibleAddModal(false);

  const addItem = (item: CardTrocItemType) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems(prevItems => [...prevItems, item]);
    }
  };

  const removeItem = (item: CardTrocItemType) => {
    setSelectedItems(prevItems =>
      prevItems.filter(prevItem => prevItem !== item),
    );
  };

  useEffect(() => {
    selectItemsCallback(selectedItems);
  }, [selectItemsCallback, selectedItems]);

  return (
    <View>
      <AddTrocItemModal
        visible={visibleAddModal}
        selectItemCallback={addItem}
        hideModalCallback={hideAddModal}
      />
      <ActionButton
        title={i18n.t('TROC_ITEM_NEGOCIATE_FORM_TROC_ITEM')}
        titleButton={i18n.t('TROC_ITEM_NEGOCIATE_FORM_ADD_TROC_ITEM')}
        icon={'plus'}
        onPressCallback={showAddModal}
      />
      <FlatList
        horizontal
        data={selectedItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TrocItemSelected
            key={item.id}
            trocItem={item}
            onCloseCallback={() => removeItem(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {width: 20},
});

export default TrocItemPicker;
