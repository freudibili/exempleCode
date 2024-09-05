import React, {useCallback} from 'react';
import {View} from 'react-native';
import designSystem from '../../../utils/designSystem';

import {FormikProvider, useFormik} from 'formik';
import {
  CreateOfferProductFormValues,
  createOfferProductInitialValues,
} from '../types/createFormType';
import CreateTrocItemContent from '../components/contents/CreateTrocItemContent';
import CloseButton from '../../../components/Buttons/CloseButton/CloseButton';
import {CreateProductSchema} from '../utils/formValidation';
import {
  TROC_ITEM_CATEGORY_TYPE,
  TROC_ITEM_TROC_TYPE,
} from '../types/TrocItemsType';
import {useAppDispatch} from '../../../../hooks/reduxHook';
import {createTrocItemRequest} from '../models/trocItemActions';
import {goBack} from '../../../utils/navigationHelper';

const CreateTrocItemSreen = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik<CreateOfferProductFormValues>({
    validationSchema: CreateProductSchema,
    initialValues: createOfferProductInitialValues,
    onSubmit: () => handleSubmit(),
  });

  const handleSubmit = () => {
    if (formik.isValid) {
      createdItem();
      goBack();
    }
  };

  const createdItem = useCallback(() => {
    let trocItem = {
      ...formik.values,
      trocTypeId: TROC_ITEM_TROC_TYPE.OFFER_ID,
      categoryTypeId: TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID,
    };

    dispatch(createTrocItemRequest(trocItem));
  }, [dispatch, formik.values]);

  return (
    <FormikProvider value={formik}>
      <View style={designSystem.styles.customStyle.container}>
        <CreateTrocItemContent />
      </View>
      <CloseButton />
    </FormikProvider>
  );
};

export default CreateTrocItemSreen;
