import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  TROC_ITEM_CONDITION,
  TROC_ITEM_PICKING,
  TROC_ITEM_QUALITY,
  TrocItemType,
} from '../../types/TrocItemsType';
import designSystem from '../../../../utils/designSystem';
import MyMapView from '../../../../components/MyMapView/MyMapView';
import TrocItemActions from '../TrocItemActions/TrocItemActions';
import OtherUserListItem from '../../../User/components/OtherUserProfile/OtherUserListItem/OtherUserListItem';
import TrocItemImageHeader from '../TrocItemImageHeader/TrocItemImageHeader';
import TextSection from '../../../../components/Texts/TextSection/TextSection';
import TrocItemTitleSection from '../TrocItemTitleSection/TrocItemTitleSection';
import TrocItemTypeIconTitle from '../TrocItemTypeIcons/TrocItemTypeIconTitle/TrocItemTypeIconTitle';
import TrocItemStatus from '../TrocItemStatus/TrocItemStatus';
import {Divider, Text} from 'react-native-paper';
import QualitySection from '../QualitySection/QualitySection';
import ConditionSection from '../ConditionSection/ConditionSection';
import i18n from '../../../../utils/i18n';

type Props = {
  trocItem: TrocItemType;
};

const TrocItemContent = ({trocItem}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView style={[designSystem.styles.customStyle.contentContainer]}>
        <View style={styles.contentContainer}>
          <TrocItemImageHeader trocItem={trocItem} />
          <TrocItemStatus status={trocItem.status} />
          <View style={styles.infoContainer}>
            <TrocItemTitleSection
              title={trocItem.title}
              price={trocItem.price}
              createdAt={trocItem.createdAt}
            />
            <View style={styles.trocTypeContainer}>
              <TrocItemTypeIconTitle
                trocTypeId={trocItem.trocType._id}
                categoryTypeId={trocItem.categoryType._id}
              />
            </View>
            <TextSection
              title={i18n.t('TROC_ITEM_DESCRIPTION')}
              subtitle={trocItem.description}
              divider
            />
            <OtherUserListItem user={trocItem.creator} />

            <MyMapView
              address={trocItem.address}
              picking={trocItem.picking as TROC_ITEM_PICKING}
            />

            {(trocItem.quality || trocItem.condition) && (
              <>
                <Text variant={'titleMedium'} style={styles.details}>
                  {i18n.t('TROC_ITEM_DETAILS')}
                </Text>
                <QualitySection
                  quality={trocItem.quality as TROC_ITEM_QUALITY}
                />
                <ConditionSection
                  condition={trocItem.condition as TROC_ITEM_CONDITION}
                />
                <Divider style={styles.divider} />
              </>
            )}
            {trocItem.negociateDescription && (
              <TextSection
                title={i18n.t('TROC_ITEM_NEGOCIATE_DESCRIPTION')}
                subtitle={trocItem.negociateDescription}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <TrocItemActions trocItem={trocItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {paddingBottom: 20},
  trocTypeContainer: {marginTop: 10},
  infoContainer: {
    marginTop: 20,
  },
  details: {
    marginTop: 10,
  },
  divider: {
    marginTop: 20,
  },
});

export default TrocItemContent;
