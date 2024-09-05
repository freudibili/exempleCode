import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Text} from 'react-native-paper';
import {getItemTypeStyle} from '../../utils/trocItemHelper';
import {navigate} from '../../../../utils/navigationHelper';
import {NAVIGATION, STACK} from '../../../../types/navigationTypes';
import designSystem from '../../../../utils/designSystem';
import {
  TROC_ITEM_CATEGORY_TYPE,
  TROC_ITEM_TROC_TYPE,
} from '../../types/TrocItemsType';
import i18n from '../../../../utils/i18n';

interface Props {
  trocTypeId: string;
  categoryTypeId: string;
}
const TrocItemTypeCard = ({trocTypeId, categoryTypeId}: Props) => {
  const itemTypeStyle = getItemTypeStyle(trocTypeId, categoryTypeId);

  const goToCreateProduct = useCallback(() => {
    const params = {
      trocTypeId,
      categoryTypeId,
    };
    if (
      trocTypeId === TROC_ITEM_TROC_TYPE.OFFER_ID &&
      categoryTypeId === TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID
    ) {
      navigate({
        stack: STACK.CREATE_TROC_ITEM_STACK,
        screen: NAVIGATION.CREATE_TROC_ITEM_SCREEN,
      });
    } else {
      navigate({screen: NAVIGATION.TROC_ITEM_CREATE_PRODUCT_SCREEN, params});
    }
  }, [categoryTypeId, trocTypeId]);

  return (
    <TouchableOpacity onPress={goToCreateProduct}>
      <View
        style={[
          styles.container,
          {backgroundColor: itemTypeStyle.backgroundColor},
        ]}>
        <View
          style={[
            styles.icon,
            {
              backgroundColor: itemTypeStyle.color,
            },
          ]}>
          <Icon
            name={itemTypeStyle.icon}
            size={26}
            color={designSystem.theme.colors.onPrimary}
          />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text variant={'titleMedium'}>{itemTypeStyle.titleCreation}</Text>
            <Text variant={'bodyMedium'}>{itemTypeStyle.text}</Text>
          </View>
          <Text variant={'labelMedium'} style={styles.textAction}>
            {i18n.t('TROC_ITEM_HANDLER_ACTION')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
  },
  icon: {
    borderRadius: 5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  textAction: {
    marginTop: 10,
  },
});
export default TrocItemTypeCard;
