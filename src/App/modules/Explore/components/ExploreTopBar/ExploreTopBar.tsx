import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import FilterBar from './FilterBar/FilterBar';

import CategoriesBar from './CategoriesBar/CategoriesBar';

const ExploreTopBar = () => {
  return (
    <View style={styles.container}>
      <CategoriesBar />
      <Divider />
      <FilterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

export default ExploreTopBar;
