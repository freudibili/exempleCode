import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Logo from '../../../../components/Logo/Logo';

const HeaderLogin = () => {
  const imageBackground = require('./images/loginBackground.jpg');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageBackground}
        resizeMode={'cover'}
        style={styles.image}>
        <View style={styles.headerContainer}>
          <Logo />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});
export default HeaderLogin;
