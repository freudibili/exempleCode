import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SocialMediaButtons = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => {}} style={styles.buttonContainer}>
      <MaterialIcons
        name="facebook"
        size={20}
        color="#666"
        style={styles.button}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}} style={styles.buttonContainer}>
      <MaterialIcons
        name="facebook"
        size={20}
        color="#666"
        style={styles.button}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}} style={styles.buttonContainer}>
      <MaterialIcons
        name="facebook"
        size={20}
        color="#666"
        style={styles.button}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  buttonContainer: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  button: {marginRight: 5},
});
export default SocialMediaButtons;
