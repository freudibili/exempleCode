import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const Logo = () => {
  const logo = require('./images/logo512.png');
  return (
    <View style={styles.container}>
      <View style={styles.backdrop} />
      <FastImage style={styles.logo} resizeMode={'contain'} source={logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
    borderColor: 'white',
  },
  backdrop: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 10,
    opacity: 0.9,
  },
  logo: {
    width: 80,
    height: 80,
  },
});
export default Logo;
