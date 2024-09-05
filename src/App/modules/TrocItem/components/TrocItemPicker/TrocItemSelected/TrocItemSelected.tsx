import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {CardTrocItemType} from '../../../types/TrocItemsType';
import TrocItemImage from '../../TrocItemImage/TrocItemImage';

interface Props {
  onCloseCallback: () => void;
  trocItem?: CardTrocItemType;
}
const TrocItemSelected = ({trocItem, onCloseCallback}: Props) => {
  if (!trocItem) {
    return null;
  }

  return (
    <View style={styles.imageContainer}>
      <TrocItemImage
        height={100}
        width={100}
        borderRadius={8}
        uri={trocItem?.imagesUrl[0]}
        trocTypeId={trocItem?.trocTypeId}
        categoryTypeId={trocItem?.categoryTypeId}
      />
      <IconButton
        style={styles.closeButton}
        size={15}
        icon={'close'}
        onPress={onCloseCallback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {marginTop: 20},

  closeButton: {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
export default TrocItemSelected;
