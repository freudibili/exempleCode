import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import AvatarImage from '../../../../components/Images/AvatarImage/AvatarImage';
import designSystem from '../../../../utils/designSystem';

interface Props {
  imageUrl: string;
  title: string;
  onPressCallback: () => void;
}
const TrocItemUserListItem = ({imageUrl, title, onPressCallback}: Props) => (
  <TouchableOpacity onPress={onPressCallback}>
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <AvatarImage size={40} imageUrl={imageUrl} />
        <View style={styles.title}>
          <Text variant={'labelLarge'}>{title}</Text>
        </View>
      </View>
      <IconButton
        icon="chevron-right"
        iconColor={designSystem.theme.colors.onSurfaceDisabled}
      />
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {marginLeft: 10},
});

export default TrocItemUserListItem;
