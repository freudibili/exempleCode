import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import MyTextInput from '../../../../components/MyTextInput/MyTextInput';
import {getTrocItem} from '../../models/trocItemSelectors';
import {TROC_ITEM_TROC_TYPE} from '../../types/TrocItemsType';
import {useFormik} from 'formik';
import {orderTrocItemSchema} from '../../../Explore/utils/exploreFormHelper';
import InfoSection from '../InfoSection/InfoSection';
import TrocItemOrderSummary from '../../../Order/components/TrocItemOrderSummary/TrocItemOrderSummary';
import {OrderInputData} from '../../../Order/types/OrdersType';
import BottomBar from '../../../../components/BottomBar/BottomBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import designSystem from '../../../../utils/designSystem';
import i18n from '../../../../utils/i18n';

interface Props {
  isLoading: boolean;
  orderItemCallback: (order: {message: string}) => void;
}
const TrocItemOrderForm = ({isLoading, orderItemCallback}: Props) => {
  const trocItem = useAppSelector(getTrocItem);

  const orderItem = useCallback(
    (message: string) => {
      orderItemCallback({message});
    },
    [orderItemCallback],
  );

  enum FORM {
    MESSAGE = 'message',
  }

  const formik = useFormik({
    initialValues: {
      message: i18n.t('TROC_ITEM_SEND_MESSAGE_START') as string,
    },
    validationSchema: orderTrocItemSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: values => {
      orderItem(values.message);
    },
  });

  const text = useMemo(() => {
    return trocItem.trocType._id === TROC_ITEM_TROC_TYPE.OFFER_ID
      ? i18n.t('TROC_ITEM_ASK_BUTTON')
      : i18n.t('TROC_ITEM_OFFER_BUTTON');
  }, [trocItem.trocType._id]);

  const orderInCreation = useMemo(() => {
    return {
      price: trocItem.price,
      trocItem,
    };
  }, [trocItem]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        style={designSystem.styles.customStyle.contentContainer}
        showsVerticalScrollIndicator={false}>
        <InfoSection
          text={i18n.t('TROC_ITEM_SEND_MESSAGE_GREETING')}
          marginVertical={10}
        />
        <MyTextInput
          onChangeText={formik.handleChange(FORM.MESSAGE)}
          onBlur={formik.handleBlur(FORM.MESSAGE)}
          value={formik.values.message || ''}
          title={i18n.t('TROC_ITEM_ACTION_FORM_SEND_MESSAGE')}
          error={formik.errors.message}
          multiline
        />
        <TrocItemOrderSummary
          order={orderInCreation as unknown as OrderInputData}
        />
      </KeyboardAwareScrollView>
      <BottomBar>
        <Button
          contentStyle={styles.button}
          onPress={formik.handleSubmit}
          mode={'contained'}
          loading={isLoading}
          disabled={isLoading}>
          {`${text}`}
        </Button>
      </BottomBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  button: {flexDirection: 'row-reverse'},
});

export default TrocItemOrderForm;
