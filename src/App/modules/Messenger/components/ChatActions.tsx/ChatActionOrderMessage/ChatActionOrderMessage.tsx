import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../../../utils/designSystem';

interface Props {
  text: string;
}

const ChatActionOrderMessage = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <Icon name={'info'} size={20} color={designSystem.theme.colors.primary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {marginLeft: 10},
});

export default ChatActionOrderMessage;
