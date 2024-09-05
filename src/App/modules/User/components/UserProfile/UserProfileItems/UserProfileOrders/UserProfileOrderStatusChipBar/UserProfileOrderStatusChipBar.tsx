import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Chip} from 'react-native-paper';

import designSystem from '../../../../../../../utils/designSystem';
import {OrderChipType} from '../../../../../types/UserType';
import i18n from '../../../../../../../utils/i18n';

interface Props {
  onChipClick: (type: OrderChipType) => void;
}

const UserProfileOrderStatusChipBar = ({onChipClick}: Props) => {
  const [selectedChip, setSelectedChip] = useState<OrderChipType>('all');

  const chipItems: OrderChipType[] = ['all', 'inProgress', 'completed'];

  const handleChipClick = (type: OrderChipType) => {
    if (onChipClick) {
      onChipClick(type);
    }
    setSelectedChip(type);
  };

  const isChipSelected = (type: OrderChipType) => {
    return selectedChip === type;
  };

  const getChipStyle = (type: OrderChipType) => {
    return isChipSelected(type)
      ? [styles.chip, styles.selectedChip]
      : styles.chip;
  };

  const getChipTextStyle = (type: OrderChipType) => {
    return isChipSelected(type) ? styles.selectedChipText : null;
  };

  const getChipText = (type: OrderChipType) => {
    switch (type) {
      case 'inProgress':
        return i18n.t('USER_PROFILE_ORDERS_CHIPP_IN_PROGRESS');
      case 'completed':
        return i18n.t('USER_PROFILE_ORDERS_CHIPP_COMPLETED');
      default:
        return i18n.t('USER_PROFILE_ORDERS_CHIPP_ALL');
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

export default UserProfileOrderStatusChipBar;
