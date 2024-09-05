import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {OrderInputData} from '../../../../Order/types/OrdersType';
import designSystem from '../../../../../utils/designSystem';

import Price from '../../../../../components/Price/Price';
import {Divider, Text} from 'react-native-paper';
import TitleForm from '../../../../../components/Texts/TitleForm/TitleForm';
import Icon from 'react-native-vector-icons/Feather';
import TrocItemImage from '../../../../TrocItem/components/TrocItemImage/TrocItemImage';
import i18n from '../../../../../utils/i18n';

interface Props {
  order: OrderInputData;
}

const ChatOrderNegociation = ({order}: Props) => {
  const {negociateTrocItems} = order;

  const plus = useMemo(() => {
    if (negociateTrocItems && order.negociatePrice) {
      return (
        <View style={styles.plusIcon}>
          <Icon
            name="plus"
            size={24}
            color={designSystem.theme.colors.onSurfaceDisabled}
          />
        </View>
      );
    }
    return null;
  }, [negociateTrocItems, order.negociatePrice]);

  const price = useMemo(() => {
    if (order.negociatePrice || order.negociatePrice === 0) {
      return (
        <Price
          price={order.negociatePrice}
          size={20}
          color={designSystem.theme.colors.tertiary}
        />
      );
    }
    return null;
  }, [order.negociatePrice]);

  const negociateItems = useMemo(() => {
    if (negociateTrocItems && negociateTrocItems.length > 0) {
      return negociateTrocItems.map(negociateTrocItem => (
        <View style={styles.negociatePrice} key={negociateTrocItem._id}>
          <TrocItemImage
            width={80}
            height={80}
            uri={negociateTrocItem.imagesUrl[0]}
            borderRadius={10}
            trocTypeId={negociateTrocItem.trocType._id}
            categoryTypeId={negociateTrocItem.categoryType._id}
          />
        </View>
      ));
    }
    return null;
  }, [negociateTrocItems]);

  return (
    <View style={styles.container}>
      <Divider bold />
      <TitleForm title={i18n.t('MESSENGER_CHAT_ORDER_NEGOCIATE_TITLE')} />
      <Text style={styles.text} variant={'bodyMedium'}>{`${
        order.requestorUser.name
      } ${i18n.t('MESSENGER_CHAT_ORDER_NEGOCIATE_SUBTITLE')}`}</Text>
      <View style={styles.itemContainer}>
        {negociateItems}
        {plus}
        {price}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 10},
  plusIcon: {marginHorizontal: 5},
  text: {
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  negociatePrice: {},
});

export default ChatOrderNegociation;
