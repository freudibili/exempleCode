import {StyleSheet} from 'react-native';
import {customColorTheme} from './colorHelper';

const shadow = {
  shadowColor: customColorTheme.shadow,
  shadowOffset: {width: 2, height: 2},
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 2,
};

export const customStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColorTheme.background,
  },
  containerVariant: {
    flex: 1,
    backgroundColor: customColorTheme.surface,
  },
  containerModal: {
    flex: 1,
    backgroundColor: customColorTheme.background,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentSubtitle: {
    marginTop: 2,
    color: customColorTheme.onSurfaceVariant,
  },
  shadow,
  listContentContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    backgroundColor: customColorTheme.surface,
    ...shadow,
  },
});
