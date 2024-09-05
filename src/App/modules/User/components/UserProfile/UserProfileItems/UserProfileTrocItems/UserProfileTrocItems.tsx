import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../../../hooks/reduxHook';
import StatusLoader from '../../../../../../components/StatusLoader/StatusLoader';
import {STATUS} from '../../../../../../types/storeTypes';

import {
  getUserTrocItems,
  getUserTrocItemsStatus,
} from '../../../../models/user/userSelectors';
import HorizontalCardUserTrocItems from '../../../userCards/HorizontalCardUserTrocItems/HorizontalCardUserTrocItems';
import UserProfileTrocItemStatusChipBar from './UserProfileTrocItemStatusChipBar.ts/UserProfileTrocItemStatusChipBar';
import {TrocItemChipType} from '../../../../types/UserType';
import {CardTrocItemOrdersType} from '../../../../../TrocItem/types/TrocItemsType';
import i18n from '../../../../../../utils/i18n';

const UserProfileTrocItems = () => {
  const [selectedChip, setSelectedChip] = useState<TrocItemChipType>('all');
  const [filteredTrocItems, setFilteredTrocItems] = useState<
    CardTrocItemOrdersType[]
  >([]);
  const userTrocItems = useAppSelector(getUserTrocItems);
  const status = useAppSelector(getUserTrocItemsStatus);

  const onChipClick = useCallback(
    (item: TrocItemChipType) => {
      setSelectedChip(item);
      // Filter the userTrocItems based on the selected status
      if (item === 'all') {
        setFilteredTrocItems(userTrocItems);
      } else {
        const filteredItems = userTrocItems.filter(
          trocItem => trocItem.status === item,
        );
        setFilteredTrocItems(filteredItems);
      }
    },
    [userTrocItems],
  );

  // init
  useEffect(() => {
    onChipClick(selectedChip);
  }, [onChipClick, selectedChip]);

  // displayed loader only when the list is empty
  const updatedStatus = useMemo(() => {
    if (!userTrocItems?.length) {
      return status;
    }
    return STATUS.SUCCESS;
  }, [userTrocItems.length, status]);

  const GetItem = useCallback(() => {
    if (userTrocItems.length < 1) {
      return (
        <View style={styles.noItem}>
          <Text>{i18n.t('USER_PROFILE_NO_TROC_ITEM')}</Text>
        </View>
      );
    }
    if (filteredTrocItems.length < 1) {
      return (
        <View style={styles.noItem}>
          <Text>{i18n.t('USER_PROFILE_NO_FILTERED_TROC_ITEM')}</Text>
        </View>
      );
    }
    return <HorizontalCardUserTrocItems items={filteredTrocItems} />;
  }, [filteredTrocItems, userTrocItems]);

  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>
        <UserProfileTrocItemStatusChipBar onChipClick={onChipClick} />
      </View>
      <StatusLoader status={updatedStatus}>
        <GetItem />
      </StatusLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  chipContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  noItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(UserProfileTrocItems);
