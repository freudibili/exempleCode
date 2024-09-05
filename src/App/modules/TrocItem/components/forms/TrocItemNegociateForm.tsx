import {useFormik} from 'formik';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import MyTextInput from '../../../../components/MyTextInput/MyTextInput';
import {negociateTrocItemSchema} from '../../../Explore/utils/exploreFormHelper';
import TrocItemOrderSummary from '../../../Order/components/TrocItemOrderSummary/TrocItemOrderSummary';
import {
  OrderCreationType,
  OrderInputData,
} from '../../../Order/types/OrdersType';
import {getTrocItem} from '../../models/trocItemSelectors';
import {CardTrocItemType} from '../../types/TrocItemsType';
import InfoSection from '../InfoSection/InfoSection';
import TrocItemPicker from '../TrocItemPicker/TrocItemPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomBar from '../../../../components/BottomBar/BottomBar';
import designSystem from '../../../../utils/designSystem';
import i18n from '../../../../utils/i18n';

interface Props {
  isLoading: boolean;
  orderItemCallback: (order: OrderCreationType) => void;
}
const TrocItemNegociateForm = ({isLoading, orderItemCallback}: Props) => {
  const [selectedItems, setSelectedItems] = useState<CardTrocItemType[]>([]);
  const trocItem = useAppSelector(getTrocItem);

  const orderItem = useCallback(
    (values: {price: number; message: string}) => {
      const selectedItemIds = selectedItems.map(item => item.id);
      orderItemCallback({
        message: values.message,
        negociateTrocItemIds: selectedItemIds,
        negociatePrice: parseInt(values.price.toString(), 10),
      });
    },
    [orderItemCallback, selectedItems],
  );

  enum FORM {
    PRICE = 'price',
    MESSAGE = 'message',
  }

  const formik = useFormik({
    initialValues: {
      price: 0,
      message: i18n.t('TROC_ITEM_SEND_MESSAGE_START') as string,
    },
    validationSchema: negociateTrocItemSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: values => {
      orderItem(values);
    },
  });

  const orderInCreation = useMemo(() => {
    return {
      price: trocItem.price,
      trocItem,
      negociatePrice: formik.values.price || 0,
      negociateTrocItems: selectedItems,
    };
  }, [formik.values.price, selectedItems, trocItem]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        style={designSystem.styles.customStyle.contentContainer}
        showsVerticalScrollIndicator={false}>
        <MyTextInput
          onChangeText={formik.handleChange(FORM.PRICE)}
          onBlur={formik.handleBlur(FORM.PRICE)}
          value={formik.values.price.toString()}
          title={i18n.t('TROC_ITEM_NEGOCIATE_FORM_PRICE')}
          keyboardType="numeric"
          error={formik.errors.price}
        />
        <View style={styles.trocItemPickerContainer}>
          <TrocItemPicker
            selectItemsCallback={item => {
              if (item) {
                setSelectedItems(item);
              }
            }}
          />
        </View>

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
          onPress={formik.handleSubmit}
          mode={'contained'}
          loading={isLoading}
          disabled={isLoading}>
          {i18n.t('TROC_ITEM_NEGOCIATE_BUTTON')}
        </Button>
      </BottomBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {marginBottom: 10},
  trocItemPickerContainer: {marginBottom: 20},
});

export default TrocItemNegociateForm;
