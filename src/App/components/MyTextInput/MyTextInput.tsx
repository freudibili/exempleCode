import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  KeyboardTypeOptions,
  Keyboard,
  ViewStyle,
} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import designSystem from '../../utils/designSystem';
import ValidationFormError from '../ValidationFormError/ValidationFormError';

interface Props {
  title?: string;
  value: string;
  onChangeText?: ((text: string) => void) | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  numberOfLines?: number;
  placeholder?: string;
  multiline?: boolean;
  outlineColor?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  style?: ViewStyle;
  textInputStyle?: ViewStyle;
}

const MyTextInput = ({
  title,
  value,
  onChangeText,
  onBlur,
  numberOfLines,
  placeholder,
  multiline,
  secureTextEntry,
  error,
  keyboardType,
  style,
  textInputStyle,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onBlur) {
      onBlur(e);
      Keyboard.dismiss();
    }
    setIsFocused(false);
  };

  const outlineColor = useMemo(() => {
    if (isFocused) {
      return designSystem.theme.colors.primary;
    } else if (error) {
      return designSystem.theme.colors.error;
    }
    return designSystem.theme.colors.outline;
  }, [error, isFocused]);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.textInput, textInputStyle]}
        mode={'outlined'}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={e => handleBlur(e)}
        value={value}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        placeholderTextColor={designSystem.theme.colors.onSurfaceDisabled}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
      />

      {title && (
        <Text
          style={[styles.title, {color: outlineColor}]}
          variant={'titleMedium'}
          numberOfLines={1}>
          {title}
        </Text>
      )}
      <View style={styles.errorContainer}>
        <ValidationFormError error={error} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginVertical: 10},
  title: {
    position: 'absolute',
    top: -7,
    left: 10,
    backgroundColor: designSystem.theme.colors.background,
    paddingHorizontal: 5,
  },

  textInput: {
    paddingVertical: 5,
    backgroundColor: designSystem.theme.colors.background,
  },
  errorContainer: {marginTop: 5},
});
export default MyTextInput;
