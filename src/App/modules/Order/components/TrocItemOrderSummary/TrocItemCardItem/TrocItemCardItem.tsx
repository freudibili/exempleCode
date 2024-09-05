import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TrocItemInputData} from '../../../../TrocItem/types/TrocItemsType';
import {navigate} from '../../../../../utils/navigationHelper';
import {NAVIGATION, STACK} from '../../../../../types/navigationTypes';
import TrocItemImage from '../../../../TrocItem/components/TrocItemImage/TrocItemImage';
import {Text} from 'react-native-paper';
import {CapitalizeFirstLetter} from '../../../../../utils/textHelper';
import TrocItemTypeIconTitle from '../../../../TrocItem/components/TrocItemTypeIcons/TrocItemTypeIconTitle/TrocItemTypeIconTitle';
import Price from '../../../../../components/Price/Price';

interface Props {
  trocItem: TrocItemInputData;
  size: number;
  canInteract?: boolean;
}

const TrocItemCardItem = ({trocItem, size, canInteract}: Props) => {
  const goToTrocItem = () => {
    navigate({
      stack: STACK.TROC_ITEM_STACK,
      screen: NAVIGATION.TROC_ITEM_SCREEN,
      params: {id: trocItem._id},
    });
  };

  const renderContent = (
    <>
      <View style={styles.leftContainer}>
        <TrocItemImage
          width={size}
          height={size}
          uri={trocItem.imagesUrl[0]}
          borderRadius={10}
          trocTypeId={trocItem.trocType._id}
          categoryTypeId={trocItem.categoryType._id}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text variant={'titleMedium'} numberOfLines={1}>
          {CapitalizeFirstLetter(trocItem.title)}
        </Text>
        <View style={styles.bottomContainer}>
          <TrocItemTypeIconTitle
            trocTypeId={trocItem.trocType._id}
            categoryTypeId={trocItem.categoryType._id}
            short
          />
          <Price price={trocItem.price} size={16} />
        </View>
      </View>
    </>
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
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  leftContainer: {},
  rightContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-around',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default memo(TrocItemCardItem);
