import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  CreateTrocItemContentMethods,
  CreateTrocItemContentProps,
} from '../../../types/CreateTrocItemsType';
import {useFormik, useFormikContext} from 'formik';
import {
  CreateOfferProductFormQualityValues,
  CreateOfferProductFormValues,
  createOfferProductQualityInitialValues,
} from '../../../types/createFormType';
import {CreateProductQualitySchema} from '../../../utils/formValidation';
import TitleForm from '../../../../../components/Texts/TitleForm/TitleForm';

import MyTextInput from '../../../../../components/MyTextInput/MyTextInput';
import TrocItemFormHeader from '../../TrocItemFormHeader/TrocItemFormHeader';
import ListItemsPicker from '../../../../../components/Pickers/ListItemsPicker/ListItemsPicker';
import {
  getConditionItems,
  getQualityItems,
} from '../../../utils/trocItemHelper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../../../../utils/i18n';

const CreateTrocItemFormQualitySection = forwardRef<
  CreateTrocItemContentMethods,
  CreateTrocItemContentProps
>(({onValidate}, ref) => {
  const {values: contextValues, setValues: setContextValues} =
    useFormikContext<CreateOfferProductFormValues>();

  const {
    setFieldValue,
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<CreateOfferProductFormQualityValues>({
    validationSchema: CreateProductQualitySchema,
    initialValues: contextValues || createOfferProductQualityInitialValues,
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

  const handleQuality = useCallback(
    (value: string) => {
      setFieldValue('quality', value);
    },
    [setFieldValue],
  );

  const handleCondition = useCallback(
    (value: string) => {
      setFieldValue('condition', value);
    },
    [setFieldValue],
  );

  useEffect(() => {
    if (contextValues.quality.length > 0) {
      handleQuality(contextValues.quality);
    }
    if (contextValues.condition) {
      handleCondition(contextValues.condition);
    }
  }, [contextValues, handleQuality, handleCondition]);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}>
      <TrocItemFormHeader
        title={i18n.t('TROC_ITEM_CREATE_FORM_QUALITY_TITLE')}
      />
      <View>
        <TitleForm
          title={i18n.t('TROC_ITEM_CREATE_FORM_ITEM_CONDITION_TITLE')}
        />
        <ListItemsPicker
          initValue={values.condition}
          onPressItem={handleCondition}
          items={getConditionItems}
        />
        <TitleForm title={i18n.t('TROC_ITEM_CREATE_FORM_ITEM_QUALITY_TITLE')} />
        <ListItemsPicker
          initValue={values.quality}
          onPressItem={handleQuality}
          items={getQualityItems}
          numberOfColumn={3}
        />
      </View>
      <MyTextInput
        placeholder={i18n.t('TROC_ITEM_CREATE_FORM_DESCRIPTION_PLACEHOLDER')}
        title={i18n.t('TROC_ITEM_CREATE_FORM_DESCRIPTION')}
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        value={values.description}
        error={errors.description}
        style={styles.textInputContainterStyle}
        textInputStyle={styles.textInputStyle}
      />
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  textInputContainterStyle: {flex: 1},
  textInputStyle: {flex: 1},
});

export default CreateTrocItemFormQualitySection;
