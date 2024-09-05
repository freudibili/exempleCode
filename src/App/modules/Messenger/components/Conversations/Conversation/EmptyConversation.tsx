import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import EmptyAvatar from '../../../../../components/Images/AvatarImage/EmptyAvatar';
import designSystem from '../../../../../utils/designSystem';
import i18n from '../../../../../utils/i18n';

const EmptyConversation = () => (
  <>
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <EmptyAvatar width={30} height={30} disabled />
        <View style={styles.textContainer}>
          <Text variant={'bodyMedium'} style={styles.text}>
            {i18n.t('MESSENGER_NOT_EXISTING_USER')}
          </Text>
        </View>
      </View>
    </View>
    <Divider />
  </>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {flexDirection: 'row', alignItems: 'center'},
  textContainer: {
    marginLeft: 10,
  },
  text: {color: designSystem.theme.colors.onSurfaceDisabled},
});

export default EmptyConversation;
