import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import StatusLoader from '../../../../../components/StatusLoader/StatusLoader';
import TitleForm from '../../../../../components/Texts/TitleForm/TitleForm';
import ExploreCardItem from '../../../../Explore/components/ExploreCardItems/ExploreCardItem/ExploreCardItem';

import {
  getOtherUserTrocItemsStatus,
  getOtherUserTrocItems,
} from '../../../models/otherUser/otherUserSelectors';
import i18n from '../../../../../utils/i18n';

const OtherUserTrocItems = () => {
  const trocItems = useAppSelector(getOtherUserTrocItems);
  const status = useAppSelector(getOtherUserTrocItemsStatus);

  return (
    <StatusLoader status={status}>
      <View style={styles.container}>
        <TitleForm title={i18n.t('OTHER_USER_TROC_ITEM_TITLE')} />
        <FlatList
          ItemSeparatorComponent={() => <Divider bold />}
          data={trocItems}
          renderItem={({item}) => <ExploreCardItem trocItem={item} />}
          keyExtractor={item => 'item_' + item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </StatusLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default OtherUserTrocItems;
