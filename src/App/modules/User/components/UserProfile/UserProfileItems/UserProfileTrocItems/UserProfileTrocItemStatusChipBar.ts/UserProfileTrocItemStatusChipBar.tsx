import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Chip} from 'react-native-paper';
import {TROC_ITEM_STATUS} from '../../../../../../TrocItem/types/TrocItemsType';
import designSystem from '../../../../../../../utils/designSystem';
import {TrocItemChipType} from '../../../../../types/UserType';
import i18n from '../../../../../../../utils/i18n';

interface Props {
  onChipClick: (type: TrocItemChipType) => void;
}

const UserProfileTrocItemStatusChipBar = ({onChipClick}: Props) => {
  const [selectedChip, setSelectedChip] = useState<TrocItemChipType>('all');

  const chipItems: TrocItemChipType[] = [
    'all',
    ...Object.values(TROC_ITEM_STATUS),
  ];

  const handleChipClick = (type: TrocItemChipType) => {
    if (onChipClick) {
      onChipClick(type);
    }
    setSelectedChip(type);
  };

  const isChipSelected = (type: TrocItemChipType) => {
    return selectedChip === type;
  };

  const getChipStyle = (type: TrocItemChipType) => {
    return isChipSelected(type)
      ? [styles.chip, styles.selectedChip]
      : styles.chip;
  };

  const getChipTextStyle = (type: TrocItemChipType) => {
    return isChipSelected(type) ? styles.selectedChipText : null;
  };

  const getChipText = (type: TrocItemChipType) => {
    switch (type) {
      case TROC_ITEM_STATUS.ENABLED:
        return i18n.t('USER_PROFILE_TROC_ITEMS_CHIPP_ENABLE');
      case TROC_ITEM_STATUS.DISABLED:
        return i18n.t('USER_PROFILE_TROC_ITEMS_CHIPP_DISABLE');
      case TROC_ITEM_STATUS.COMPLETED:
        return i18n.t('USER_PROFILE_TROC_ITEMS_CHIPP_COMPLETED');
      default:
        return i18n.t('USER_PROFILE_TROC_ITEMS_CHIPP_ALL');
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {chipItems.map((item, index) => (
          <React.Fragment key={index}>
            <Chip
              onPress={() => handleChipClick(item)}
              style={getChipStyle(item)}
              textStyle={getChipTextStyle(item)}>
              {getChipText(item)}
            </Chip>
            {index !== chipItems.length - 1 && <View style={styles.spacing} />}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {},
  selectedChip: {
    backgroundColor: designSystem.theme.colors.primary,
  },
  selectedChipText: {
    color: designSystem.theme.colors.onPrimary,
  },
  spacing: {
    width: 10,
  },
});

export default UserProfileTrocItemStatusChipBar;
