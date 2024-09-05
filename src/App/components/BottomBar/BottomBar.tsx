import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import designSystem from '../../utils/designSystem';

interface Props {
  children: JSX.Element;
  inModal?: boolean;
  style?: StyleProp<ViewStyle>;
}
const BottomBar = ({children, inModal, style}: Props) => {
  const insets = useSafeAreaInsets();

  const marginBottom = inModal ? -insets.bottom : 0;
  return (
    <View
      style={[
        style || styles.container,
        {paddingBottom: insets.bottom + 10, marginBottom},
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: designSystem.theme.colors.primaryContainer,
    paddingHorizontal: 20,
    paddingTop: 10,
    ...designSystem.styles.customStyle.shadow,
  },
});

export default BottomBar;
