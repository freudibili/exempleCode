import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import PriceIcon from '../Price/PriceIcon';
import ValidationFormError from '../ValidationFormError/ValidationFormError';

interface PricePickerProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const PricePicker: React.FC<PricePickerProps> = ({value, onChange, error}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="0"
          onChangeText={text => {
            const numericValue = parseFloat(text);
            onChange(isNaN(numericValue) ? 0 : numericValue);
          }}
          value={value === 0 ? '' : value.toString()}
          keyboardType="numeric"
        />
        <PriceIcon style={styles.icon} size={50} />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <ValidationFormError error={error} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontWeight: '900',
    fontFamily: 'Roboto',
    fontSize: 50,
    borderBottomWidth: 0,
  },
  icon: {
    marginLeft: 10,
  },
  errorContainer: {marginTop: 5},
});

export default PricePicker;
