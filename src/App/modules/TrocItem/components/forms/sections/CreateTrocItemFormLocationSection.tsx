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
  CreateOfferProductFormLocationValues,
  CreateOfferProductFormValues,
  createOfferProductLocationInitialValues,
} from '../../../types/createFormType';
import {CreateProductLocationSchema} from '../../../utils/formValidation';
import TrocItemFormHeader from '../../TrocItemFormHeader/TrocItemFormHeader';
import LocationPicker from '../../../../../components/Pickers/LocationPicker';
import {AddressType} from '../../../../../types/locationType';
import TitleForm from '../../../../../components/Texts/TitleForm/TitleForm';
import ListItemsPicker from '../../../../../components/Pickers/ListItemsPicker/ListItemsPicker';
import {getPickingItems} from '../../../utils/trocItemHelper';
import i18n from '../../../../../utils/i18n';

const CreateTrocItemFormLocationSection = forwardRef<
  CreateTrocItemContentMethods,
  CreateTrocItemContentProps
>(({onValidate}, ref) => {
  const {values: contextValues, setValues: setContextValues} =
    useFormikContext<CreateOfferProductFormValues>();

  const {values, handleSubmit, setFieldValue, errors} =
    useFormik<CreateOfferProductFormLocationValues>({
      validationSchema: CreateProductLocationSchema,
      initialValues: contextValues || createOfferProductLocationInitialValues,
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

  const handlePicking = useCallback(
    (value: string) => {
      setFieldValue('picking', value);
    },
    [setFieldValue],
  );

  const handleAdress = useCallback(
    (value: AddressType) => {
      setFieldValue('address', value);
    },
    [setFieldValue],
  );

  useEffect(() => {
    if (contextValues.picking.length > 0) {
      handlePicking(contextValues.picking);
    }
  }, [contextValues, handlePicking]);

  return (
    <View style={styles.container}>
      <TrocItemFormHeader
        title={i18n.t('TROC_ITEM_CREATE_FORM_LOCATION_TITLE')}
        subtitle={i18n.t('TROC_ITEM_CREATE_FORM_LOCATION_SUBTITLE')}
      />

      <LocationPicker
        title={i18n.t('TROC_ITEM_CREATE_FORM_ADDRESS')}
        getDataCallback={handleAdress}
        initValue={
          contextValues.address.formattedAddress.length > 0
            ? contextValues.address
            : undefined
        }
        error={errors.address?.formattedAddress}
      />
      <TitleForm
        title={i18n.t('TROC_ITEM_CREATE_FORM_ITEM_PICKING_TITLE')}
        style={styles.titleForm}
      />
      <ListItemsPicker
        items={getPickingItems}
        onPressItem={handlePicking}
        initValue={values.picking}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleForm: {
    marginTop: 10,
  },
});

export default CreateTrocItemFormLocationSection;
