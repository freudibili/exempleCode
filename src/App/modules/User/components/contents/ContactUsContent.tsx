import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MyTextInput from '../../../../components/MyTextInput/MyTextInput';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton/PrimaryButton';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import {getUser} from '../../models/user/userSelectors';
import i18n from '../../../../utils/i18n';
import {contactUsRequest} from '../../../../models/appActions';

const ContactUsContent = () => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    dispatch(
      contactUsRequest({
        senderEmail: email,
        message,
        type: `Name: ${name}`,
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Adjust this offset as needed
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>
          <MyTextInput
            title={i18n.t('APP_CONTACT_US_NAME')}
            placeholder={i18n.t('APP_CONTACT_US_NAME_PLACEHOLDER')}
            value={name}
            onChangeText={text => setName(text)}
          />
          <MyTextInput
            title={i18n.t('APP_CONTACT_US_EMAIL')}
            placeholder={i18n.t('APP_CONTACT_US_EMAIL_PLACEHOLDER')}
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
          <MyTextInput
            title={i18n.t('APP_CONTACT_US_MESSAGE')}
            placeholder={i18n.t('APP_CONTACT_US_MESSAGE_PLACEHOLDER')}
            value={message}
            onChangeText={text => setMessage(text)}
            style={styles.input}
            multiline
            numberOfLines={4}
          />
        </View>

        <PrimaryButton
          label={i18n.t('APP_CONTACT_US_BUTTON')}
          onPress={handleSendMessage}
          style={styles.button}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {margin: 20, flex: 1},

  input: {
    height: '25%',
  },
  button: {
    margin: 20,
  },
});

export default ContactUsContent;
