import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {MessageType} from '../../types/messengerTypes';
import Message from './Message/Message';
import {ActivityIndicator} from 'react-native-paper';
import {getMessagesStatus} from '../../models/messengerSelectors';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import {STATUS} from '../../../../types/storeTypes';

interface Props {
  messages: MessageType[];
}

const Messages = ({messages}: Props) => {
  const status = useAppSelector(getMessagesStatus);
  if (messages.length < 1) {
    return <Text>No Messages yet</Text>;
  }

  const displayLoader = status !== STATUS.SUCCESS;

  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        data={messages}
        inverted
        renderItem={({item}) => <Message message={item} />}
      />
      {displayLoader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={16} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20},
  flatListContentContainer: {paddingVertical: 20},
  loaderContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});

export default Messages;
