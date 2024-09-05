import React, {forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  CreateTrocItemContentMethods,
  CreateTrocItemContentProps,
} from '../../../types/CreateTrocItemsType';
import {useFormik, useFormikContext} from 'formik';
import {
  CreateOfferProductFormExchangeValues,
  CreateOfferProductFormValues,
  createOfferProductExchangeInitialValues,
} from '../../../types/createFormType';
import {CreateProductExchangeSchema} from '../../../utils/formValidation';
import MyTextInput from '../../../../../components/MyTextInput/MyTextInput';
import PricePicker from '../../../../../components/Pickers/PricePicker';
import TrocItemFormHeader from '../../TrocItemFormHeader/TrocItemFormHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getHeight} from '../../../../../utils/responsiveHelper';
import i18n from '../../../../../utils/i18n';
import InfoButton from '../../../../../components/Buttons/InfoButton/infoButton';

const CreateTrocItemFormExchangeSection = forwardRef<
  CreateTrocItemContentMethods,
  CreateTrocItemContentProps
>(({onValidate}, ref) => {
  const {values: contextValues, setValues: setContextValues} =
    useFormikContext<CreateOfferProductFormValues>();

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik<CreateOfferProductFormExchangeValues>({
    validationSchema: CreateProductExchangeSchema,
    initialValues: contextValues || createOfferProductExchangeInitialValues,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: formData => {
      setContextValues({...contextValues, ...formData});
      onValidate();
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      handleNextFromParent: () => {
        handleSubmit();
      },
    }),
    [handleSubmit],
  );

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}>
      <TrocItemFormHeader
        title={i18n.t('TROC_ITEM_CREATE_FORM_EXCHANGE_TITLE')}
        subtitle={i18n.t('TROC_ITEM_CREATE_FORM_EXCHANGE_SUBTITLE')}
        rightButton={<InfoButton size={20} />}
      />

      <View style={styles.contentContainer}>
        <View style={styles.priceContainer}>
          <PricePicker
            value={values.price}
            onChange={valuePrice => setFieldValue('price', valuePrice)}
            error={errors.price}
          />
        </View>

        <MyTextInput
          placeholder={i18n.t(
            'TROC_ITEM_CREATE_FORM_NEGOCIATE_DESCRIPTION_PLACEHOLDER',
          )}
          title={i18n.t('TROC_ITEM_CREATE_FORM_NEGOCIATE_DESCRIPTION')}
          onChangeText={handleChange('negociateDescription')}
          onBlur={handleBlur('negociateDescription')}
          value={values.negociateDescription}
          error={errors.negociateDescription}
          style={styles.textInputContainterStyle}
          textInputStyle={styles.textInputStyle}
        />
      </View>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    height: getHeight * 0.6,
    justifyContent: 'center',
  },
  priceContainer: {
    flexGrow: 2,
    justifyContent: 'center',
  },
  textInputContainterStyle: {flex: 1},
  textInputStyle: {},
});

export default CreateTrocItemFormExchangeSection;
