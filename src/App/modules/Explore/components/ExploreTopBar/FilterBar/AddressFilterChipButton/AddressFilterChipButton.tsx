import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {NAVIGATION} from '../../../../../../types/navigationTypes';
import {navigate} from '../../../../../../utils/navigationHelper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../../../../utils/designSystem';

interface Props {
  distance: number;
}
const AddressFilterChipButton = ({distance}: Props) => {
  const openAddressFilterHandler = () => {
    navigate({
      screen: NAVIGATION.EXPLORE_FILTER_ADDRESS_MODAL,
    });
  };

  return (
    <View style={styles.container}>
      <Chip
        icon={() => (
          <Icon name={'map-pin'} color={designSystem.theme.colors.secondary} />
        )}
        closeIcon="menu-down"
        onPress={openAddressFilterHandler}
        onClose={openAddressFilterHandler}>
        {`${distance} km`}
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});

export default memo(AddressFilterChipButton);
