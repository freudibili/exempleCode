import React, {useState} from 'react';
import MyTextInput from '../MyTextInput/MyTextInput';
import {StyleSheet, View} from 'react-native';
import PrimaryButton from '../Buttons/PrimaryButton/PrimaryButton';
import i18n from '../../utils/i18n';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHook';
import {contactUsRequest} from '../../models/appActions';
import {getUser} from '../../modules/User/models/user/userSelectors';
interface Props {
  onComplete: () => void;
  rating?: number;
}
const FeedBackSender = ({onComplete, rating}: Props) => {
  const [feedback, setFeedback] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const sendFeedBack = () => {
    dispatch(
      contactUsRequest({
        senderEmail: user.email,
        message: feedback,
        type: `Rating: ${rating}`,
      }),
    );
    onComplete();
  };
  return (
    <View style={styles.container}>
      <MyTextInput
        placeholder={i18n.t('APP_RATING_FEEDBACK_PLACEHOLDER')}
        style={styles.feedbackInput}
        multiline
        numberOfLines={3}
        value={feedback}
        onChangeText={text => setFeedback(text)}
      />
      <PrimaryButton
        onPress={sendFeedBack}
        label={i18n.t('APP_RATING_FEEDBACK_BUTTON')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    justifyContent: 'flex-end',
  },
  feedbackInput: {
    width: '100%',
    marginBottom: 20,
  },
});

export default FeedBackSender;
