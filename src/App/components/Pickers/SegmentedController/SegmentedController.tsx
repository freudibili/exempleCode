import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../utils/designSystem';
import {CapitalizeFirstLetter} from '../../../utils/textHelper';

interface Props {
  items: {value: string; label: string}[];
  getDataCallback: (value: string) => void;
  initValue?: string | null;
  enableNoSelection?: boolean;
  style?: ViewStyle;
}

const SegmentedController = ({
  items,
  getDataCallback,
  initValue,
  enableNoSelection,
  style,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState(initValue || '');

  useEffect(() => {
    if (initValue === null) {
      setSelectedValue('');
    }
  }, [initValue]);

  useEffect(() => {
    getDataCallback(selectedValue);
  }, [getDataCallback, selectedValue]);

  const handleChange = useCallback(
    (newValue: string) => {
      if (enableNoSelection && selectedValue === newValue) {
        setSelectedValue('');
      } else {
        setSelectedValue(newValue);
      }
    },
    [enableNoSelection, selectedValue],
  );

  const GetButton = useCallback(() => {
    const buttons = items.map(item => {
      const selectedButtonStyle =
        item.value === selectedValue ? styles.selectedButton : null;
      const selectedTextStyle =
        item.value === selectedValue
          ? styles.selectedText
          : styles.notSelectedText;

      return (
        <TouchableOpacity
          key={item.value}
          onPress={() => handleChange(item.value)}
          style={[selectedButtonStyle, styles.button]}>
          <Text style={selectedTextStyle} variant={'labelLarge'}>
            {CapitalizeFirstLetter(item.label)}
          </Text>
        </TouchableOpacity>
      );
    });
    return <View style={[styles.buttonContainer, style]}>{buttons}</View>;
  }, [handleChange, items, selectedValue, style]);

  return <GetButton />;
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: designSystem.theme.colors.surfaceDisabled,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: designSystem.theme.colors.background,
    ...designSystem.styles.customStyle.shadow,
  },
  selectedText: {
    color: designSystem.theme.colors.onSurface,
  },
  notSelectedText: {
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
});
export default SegmentedController;
