import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {navigate} from '../../../../../utils/navigationHelper';
import {NAVIGATION, STACK} from '../../../../../types/navigationTypes';
import {CardTrocItemType} from '../../../../TrocItem/types/TrocItemsType';
import {getTimeAgo} from '../../../../../utils/dateHelper';
import designSystem from '../../../../../utils/designSystem';
import TrocItemTypeIconTitle from '../../../../TrocItem/components/TrocItemTypeIcons/TrocItemTypeIconTitle/TrocItemTypeIconTitle';
import Price from '../../../../../components/Price/Price';
import {CapitalizeFirstLetter} from '../../../../../utils/textHelper';
import TrocItemImage from '../../../../TrocItem/components/TrocItemImage/TrocItemImage';

interface Props {
  trocItem: CardTrocItemType;
}

const ExploreCardItem = ({trocItem}: Props) => {
  const goToTrocItem = () => {
    navigate({
      stack: STACK.TROC_ITEM_STACK,
      screen: NAVIGATION.TROC_ITEM_SCREEN,
      params: {id: trocItem.id},
    });
  };

  const timeAgo = useMemo(() => {
    return trocItem.createdAt ? getTimeAgo(trocItem.createdAt) : '';
  }, [trocItem.createdAt]);

  return (
    <>
      <TouchableOpacity onPress={goToTrocItem} style={styles.container}>
        <View style={styles.image}>
          <TrocItemImage
            width={'100%'}
            height={100}
            uri={trocItem.imagesUrl[0]}
            borderRadius={10}
            trocTypeId={trocItem.trocTypeId}
            categoryTypeId={trocItem.categoryTypeId}
          />
        </View>

        <View style={styles.rightContainer}>
          <View>
            <Text variant={'titleMedium'} numberOfLines={2}>
              {CapitalizeFirstLetter(trocItem.title)}
            </Text>
            <Text
              variant={'bodyMedium'}
              style={[designSystem.styles.customStyle.contentSubtitle]}>
              {timeAgo}
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            <TrocItemTypeIconTitle
              trocTypeId={trocItem.trocTypeId}
              categoryTypeId={trocItem.categoryTypeId}
            />
            <Price price={trocItem.price} size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row', marginVertical: 15},
  image: {
    height: 100,
    flex: 1,
  },
  rightContainer: {
    flex: 3,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  subtitle: {marginTop: 3},
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default ExploreCardItem;
