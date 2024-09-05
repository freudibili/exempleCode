import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const TestScreen = () => {
  return <SafeAreaView style={styles.safeArea}></SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default TestScreen;
