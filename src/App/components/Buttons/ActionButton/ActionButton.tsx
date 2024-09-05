import React, {memo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../utils/designSystem';
import TitleForm from '../../Texts/TitleForm/TitleForm';

interface Props {
  title: string;
  titleButton: string;
  icon: string;
  onPressCallback: () => void;
}
const ActionButton = ({title, titleButton, icon, onPressCallback}: Props) => {
  return (
    <View style={styles.container}>
      <TitleForm title={title} />
      <TouchableOpacity
        onPress={onPressCallback}
        style={styles.actionContainer}>
        <Text style={styles.textTitle} variant={'labelLarge'}>
          {titleButton}
        </Text>
        <View style={styles.image}>
          <Icon
            size={22}
            name={icon}
            color={designSystem.theme.colors.onSurface}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {color: designSystem.theme.colors.onSurfaceDisabled},
  textTitle: {
    marginLeft: 10,
    color: designSystem.theme.colors.onSurfaceVariant,
  },
  actionContainer: {
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: designSystem.theme.colors.primaryContainer,
  },
  image: {
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designSystem.theme.colors.surface,
    borderRadius: 8,
    ...designSystem.styles.customStyle.shadow,
  },
});

export default memo(ActionButton);
