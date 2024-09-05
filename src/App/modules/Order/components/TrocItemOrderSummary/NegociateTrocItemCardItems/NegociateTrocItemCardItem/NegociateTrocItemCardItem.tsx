import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TrocItemInputData} from '../../../../../TrocItem/types/TrocItemsType';
import {navigate} from '../../../../../../utils/navigationHelper';
import {NAVIGATION, STACK} from '../../../../../../types/navigationTypes';
import TrocItemImage from '../../../../../TrocItem/components/TrocItemImage/TrocItemImage';

interface Props {
  trocItem: TrocItemInputData;
  size: number;
  canInteract?: boolean;
}

const NegociateTrocItemCardItem = ({trocItem, size, canInteract}: Props) => {
  const goToTrocItem = () => {
    navigate({
      stack: STACK.TROC_ITEM_STACK,
      screen: NAVIGATION.TROC_ITEM_SCREEN,
      params: {id: trocItem._id},
    });
  };

  const renderContent = (
    <TrocItemImage
      width={size}
      height={size}
      uri={trocItem.imagesUrl[0]}
      borderRadius={10}
      trocTypeId={trocItem.trocType._id}
      categoryTypeId={trocItem.categoryType._id}
    />
  );

  const touchableContainer = canInteract ? (
    <TouchableOpacity style={styles.container} onPress={goToTrocItem}>
      {renderContent}
    </TouchableOpacity>
  ) : (
    <View style={styles.container}>{renderContent}</View>
  );

  return touchableContainer;
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});

export default memo(NegociateTrocItemCardItem);
