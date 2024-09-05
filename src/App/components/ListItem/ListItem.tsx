import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Price from '../Price/Price';

interface Props {
  icon: string;
  title: string;
  description?: string;
  price: number;
  color: string;
}

const ListItem = ({icon, title, description, price, color}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.itemContainer}>
          <View style={styles.leftContainer}>
            <View style={[styles.iconContainer, {backgroundColor: color}]}>
              <Icon name={icon} color="white" size={20} />
            </View>
            <View style={styles.contentContainer}>
              <Text variant={'bodyMedium'}>{title}</Text>
              {description && (
                <Text variant={'labelMedium'} numberOfLines={2}>
                  {description}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Price price={price} size={14} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 8,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  rightContainer: {
    height: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default ListItem;
