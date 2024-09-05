import React, {useMemo} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import StatusLoader from '../../../../components/StatusLoader/StatusLoader';
import TitleForm from '../../../../components/Texts/TitleForm/TitleForm';
import {STATUS} from '../../../../types/storeTypes';
import designSystem from '../../../../utils/designSystem';

import {
  getConversations,
  getConversationsStatus,
} from '../../models/messengerSelectors';
import Conversations from '../Conversations/Conversations';
import i18n from '../../../../utils/i18n';

const MessengerContent = () => {
  const conversations = useAppSelector(getConversations);
  const status = useAppSelector(getConversationsStatus);

  const updatedStatus = useMemo(() => {
    if (!conversations?.length) {
      return status;
    }
    return STATUS.SUCCESS;
  }, [conversations.length, status]);

  return (
    <SafeAreaView style={designSystem.styles.customStyle.container}>
      <StatusLoader status={updatedStatus}>
        <View
          style={[
            designSystem.styles.customStyle.contentContainer,
            styles.container,
          ]}>
          <TitleForm title={i18n.t('MESSENGER_CONVERSATION_TITLE')} />
          <Conversations conversations={conversations} />
        </View>
      </StatusLoader>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
});

export default MessengerContent;
