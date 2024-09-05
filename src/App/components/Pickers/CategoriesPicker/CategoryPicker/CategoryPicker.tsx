import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../../utils/designSystem';

import CategoryIcon from './CategoryIcon';

interface Props {
  categoryId: string;
  title: string;
  isSelected: boolean;
  onPressCallback: (categoryId: string) => void;
  contained?: boolean;
  style?: ViewStyle;
}
const VerticalCategoryPicker = ({
  categoryId,
  title,
  isSelected,
  onPressCallback,
  style,
  contained,
}: Props) => {
  const selectedStyle = useMemo(
    () => (isSelected ? styles.isSelected : styles.isNotSelected),
    [isSelected],
  );
  const selectedTextStyle = useMemo(
    () => (isSelected ? styles.isSelectedText : styles.isNotSelectedText),
    [isSelected],
  );

  const iconColor = useMemo(
    () =>
      isSelected
        ? designSystem.theme.colors.secondary
        : designSystem.theme.colors.onSurfaceDisabled,
    [isSelected],
  );

  return contained ? (
    <TouchableOpacity
      onPress={() => {
        onPressCallback(categoryId);
      }}
      style={[style, styles.container, styles.containedContainer]}>
      <View style={[styles.iconContainedContainer, selectedStyle]}>
        <CategoryIcon categoryId={categoryId} color={iconColor} />
      </View>
      <Text
        style={[styles.containedTitle, selectedTextStyle]}
        variant={'labelSmall'}
        numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        onPressCallback(categoryId);
      }}
      style={[style, styles.container, styles.expendContainer, selectedStyle]}>
      <View style={styles.iconContainer}>
        <CategoryIcon categoryId={categoryId} color={iconColor} />
      </View>
      <Text
        style={[styles.title, selectedTextStyle]}
        variant={'labelSmall'}
        numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {},
  expendContainer: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  containedContainer: {
    minWidth: 40,
    maxWidth: 100,
  },
  iconContainer: {
    height: 20,
    marginLeft: 3,
  },
  iconContainedContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  isSelected: {
    backgroundColor: designSystem.theme.colors.secondaryContainer,
    borderColor: designSystem.theme.colors.secondaryContainer,
  },
  isNotSelected: {
    backgroundColor: designSystem.theme.colors.surface,
    borderColor: designSystem.theme.colors.outlineVariant,
  },
  isSelectedText: {
    color: designSystem.theme.colors.onPrimaryContainer,
  },
  isNotSelectedText: {
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
  title: {
    marginTop: 5,
    padding: 2,
  },
  containedTitle: {
    marginTop: 4,
    textAlign: 'center',
  },
});

export default VerticalCategoryPicker;
