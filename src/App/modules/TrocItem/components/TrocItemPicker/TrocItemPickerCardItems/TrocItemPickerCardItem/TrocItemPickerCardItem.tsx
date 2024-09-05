import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {CapitalizeFirstLetter} from '../../../../../../utils/textHelper';
import {CardTrocItemType} from '../../../../types/TrocItemsType';
import TrocItemImage from '../../../TrocItemImage/TrocItemImage';
import TrocItemTypeIcon from '../../../TrocItemTypeIcons/TrocItemTypeIcon/TrocItemTypeIcon';

interface Props {
  trocItem: CardTrocItemType;
  selectItemCallback: (trocItem: CardTrocItemType) => void;
}

const TrocItemPickerCardItem = ({trocItem, selectItemCallback}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => selectItemCallback(trocItem)}
      style={styles.container}>
      <TrocItemImage
        width={'100%'}
        height={100}
        uri={trocItem.imagesUrl[0]}
        borderRadius={10}
        trocTypeId={trocItem?.trocTypeId}
        categoryTypeId={trocItem?.categoryTypeId}
      />
      <View style={styles.infoContainer}>
        <TrocItemTypeIcon
          trocTypeId={trocItem.trocTypeId}
          categoryTypeId={trocItem.categoryTypeId}
          size={16}
        />
        <Text style={styles.title} variant={'titleSmall'} numberOfLines={1}>
          {CapitalizeFirstLetter(trocItem.title)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  title: {
    marginLeft: 10,
    flex: 1,
  },
  image: {
    height: 80,
  },
  infoContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TrocItemPickerCardItem;
