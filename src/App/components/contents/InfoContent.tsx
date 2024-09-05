import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import ListItem from '../ListItem/ListItem';
import designSystem from '../../utils/designSystem';
import {itemColorTheme} from '../../utils/colorHelper';
import i18n from '../../utils/i18n';

const InfoContent = () => {
  const infoItems = useMemo(
    () => [
      {
        icon: 'book-open',
        title: i18n.t('EXPLORE_INFO_LIVRES_TITLE'),
        price: 2,
      },
      {
        icon: 'shopping-bag',
        title: i18n.t('EXPLORE_INFO_CLOTHES_TITLE'),
        price: 5,
      },
      {
        icon: 'chess',
        title: i18n.t('EXPLORE_INFO_BOARD_GAME_TITLE'),
        price: 6,
      },
      {
        icon: 'drum',
        title: i18n.t('EXPLORE_INFO_INSTRUMENTS_DE_MUSIQUE_TITLE'),
        price: 9,
      },
      {
        icon: 'leaf',
        title: i18n.t('EXPLORE_INFO_PLANTS_D_INTERIEUR_TITLE'),
        price: 4,
      },
      {
        icon: 'lightbulb',
        title: i18n.t('EXPLORE_INFO_ELECTRONIC_TITLE'),
        price: 15,
      },

      {
        icon: 'bicycle',
        title: i18n.t('EXPLORE_INFO_SPORT_TITLE'),
        price: 15,
      },
      {
        icon: 'pastafarianism',
        title: i18n.t('EXPLORE_INFO_BABY_TITLE'),
        price: 4,
      },
      {
        icon: 'concierge-bell',
        title: i18n.t('EXPLORE_INFO_FOOD_TITLE'),
        price: 2,
      },
    ],
    [],
  );

  const renderInfoItems = useMemo(() => {
    return infoItems.map((infoItem, index) => {
      const marginBottomValue = index !== infoItems.length - 1 ? 10 : 0;

      return (
        <View
          key={index}
          style={{
            marginBottom: marginBottomValue,
          }}>
          <ListItem
            icon={infoItem.icon}
            title={infoItem.title}
            price={infoItem.price}
            color={itemColorTheme.offerProduct}
          />
        </View>
      );
    });
  }, [infoItems]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text variant={'headlineSmall'} style={styles.titleContainer}>
          {i18n.t('EXPLORE_INFO_TITLE')}
        </Text>
        <Text style={styles.descriptionContainer}>
          {i18n.t('EXPLORE_INFO_DESCRIPTION')}
        </Text>
      </View>

      <View style={designSystem.styles.customStyle.listContentContainer}>
        <ListItem
          icon="hammer"
          title={i18n.t('EXPLORE_INFO_SERVICES_TITLE')}
          description={i18n.t('EXPLORE_INFO_SERVICES_DESCRIPTION')}
          price={10}
          color={itemColorTheme.offerService}
        />
        <Divider style={styles.dividerContainer} />
        <View style={styles.infoItemsContainer}>{renderInfoItems}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  topContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  dividerContainer: {margin: 10},
  titleContainer: {width: '100%'},
  descriptionContainer: {marginVertical: 10, width: '100%'},
  infoItemsContainer: {},
});

export default InfoContent;
