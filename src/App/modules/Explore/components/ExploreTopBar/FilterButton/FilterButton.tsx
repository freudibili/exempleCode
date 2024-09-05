import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {IconButton} from 'react-native-paper';
import {NAVIGATION} from '../../../../../types/navigationTypes';
import designSystem from '../../../../../utils/designSystem';
import {navigate} from '../../../../../utils/navigationHelper';

const FilterButton = () => (
  <IconButton
    mode="contained"
    style={styles.button}
    size={15}
    icon={() => (
      <Icon
        name={'sliders'}
        size={15}
        color={designSystem.theme.colors.onBackground}
      />
    )}
    onPress={() =>
      navigate({
        screen: NAVIGATION.EXPLORE_FILTER_SCREEN,
      })
    }
  />
);

export default FilterButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: designSystem.theme.colors.secondaryContainer,
    marginRight: 10,
    borderRadius: 8,
    padding: 0,
    margin: 0,
  },
});
