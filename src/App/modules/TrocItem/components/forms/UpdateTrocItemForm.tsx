// Formik x React Native example
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {useFormik} from 'formik';
import {CreateItemSchema} from '../../utils/formValidation';
import {imageDataType} from '../../../../../types/imageType';
import LocationPicker from '../../../../components/Pickers/LocationPicker';
import {
  TROC_ITEM_CATEGORY_TYPE,
  TROC_ITEM_TROC_TYPE,
  TrocItemCreationFormType,
  TrocItemInputData,
} from '../../types/TrocItemsType';
import CategoriesPicker from '../../../../components/Pickers/CategoriesPicker/CategoriesPicker';
import {AddressType} from '../../../../types/locationType';
import TrocTypePicker from '../../../../components/Pickers/TrocTypePicker';
import CategoryTypePicker from '../../../../components/Pickers/CategoryTypePicker';
import TrocItemImagePicker from '../TrocItemImagePicker/TrocItemImagePicker';
import MyTextInput from '../../../../components/MyTextInput/MyTextInput';
import TitleForm from '../../../../components/Texts/TitleForm/TitleForm';
import ListItemsPicker from '../../../../components/Pickers/ListItemsPicker/ListItemsPicker';
import {
  getConditionItems,
  getPickingItems,
  getQualityItems,
} from '../../utils/trocItemHelper';
import i18n from '../../../../utils/i18n';

interface Props {
  trocItem: TrocItemInputData;
  getFormDataCallback: (createdItem: TrocItemCreationFormType) => void;
}

const UpdateTrocItemForm = ({trocItem, getFormDataCallback}: Props) => {
  const [imagesData, setImagesData] = useState<imageDataType[]>([]);
  const [imageError, setImageError] = useState<string>('');
  const [address, setAddress] = useState<AddressType>();
  const [categoriesId, setCategoriesId] = useState<string[]>([]);
  const [trocTypeId, setTrocTypeId] = useState<string>('');
  const [categoryTypeId, setCategoryTypeId] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [quality, setQuality] = useState<string>('');
  const [picking, setPicking] = useState<string>('');

  enum FORM {
    TITLE = 'title',
    PRICE = 'price',
    DESCRIPTION = 'description',
    NEGOCIATE_DESCRIPTION = 'negociateDescription',
  }

  const checkIfImageNeeded = useCallback(() => {
    if (trocTypeId === TROC_ITEM_TROC_TYPE.SEARCH_ID || imagesData.length > 0) {
      setImageError('');
      return true;
    }

    setImageError(i18n.t('ERROR_FORM_TROC_ITEM_FORM_IMAGE_REQUIRED'));
    return false;
  }, [imagesData.length, trocTypeId]);

  const isOfferProduct =
    trocTypeId === TROC_ITEM_TROC_TYPE.OFFER_ID &&
    categoryTypeId === TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID;

  const formik = useFormik({
    validationSchema: CreateItemSchema,
    initialValues: {
      title: trocItem.title,
      price: trocItem.price.toString(),
      description: trocItem.description,
      negociateDescription: trocItem.negociateDescription || '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: formData => {
      const isImageOk = checkIfImageNeeded();

      const haveAllData = formData && address && isImageOk;

      if (haveAllData) {
        getFormDataCallback({
          title: formData.title,
          price: Number(formData.price),
          address,
          description: formData.description,
          categoriesId,
          imagesData,
          trocTypeId,
          categoryTypeId,
          condition,
          quality,
          picking,
          negociateDescription: formData.negociateDescription,
        });
      }
    },
  });

  const formattedCategories: string[] = useMemo(
    () => trocItem.categories.map(categorie => categorie._id),
    [trocItem.categories],
  );

  const initImagesValues = useMemo(() => {
    return trocItem.imagesUrl.map(uri => ({
      name: '',
      type: '',
      uri,
    }));
  }, [trocItem.imagesUrl]);

  return (
    // @TODO HANDLE WARNING : FLATLIST SHOULD NOT BE NESTED IN SCROLLVIEW
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.container}>
        <TrocTypePicker
          initValue={trocItem.trocType._id}
          getDataCallback={setTrocTypeId}
        />
        <CategoryTypePicker
          initValue={trocItem.categoryType._id}
          getDataCallback={setCategoryTypeId}
        />
        <Divider style={styles.divider} bold />
        <View style={styles.firstInputContainer}>
          <MyTextInput
            title={i18n.t('TROC_ITEM_CREATE_FORM_TITLE')}
            onChangeText={formik.handleChange(FORM.TITLE)}
            onBlur={formik.handleBlur(FORM.TITLE)}
            value={formik.values.title}
            error={formik.errors.title}
          />
        </View>

        <TrocItemImagePicker
          getDataCallback={setImagesData}
          initValue={initImagesValues}
          error={imageError}
        />
        <CategoriesPicker
          getDataCallback={setCategoriesId}
          initValue={formattedCategories}
          showTitle
          horizontal
        />
        {isOfferProduct && (
          <>
            <TitleForm
              title={i18n.t('TROC_ITEM_CREATE_FORM_ITEM_CONDITION_TITLE')}
            />
            <ListItemsPicker
              initValue={trocItem.condition}
              onPressItem={setCondition}
              items={getConditionItems}
            />
            <TitleForm
              title={i18n.t('TROC_ITEM_CREATE_FORM_ITEM_QUALITY_TITLE')}
            />
            <ListItemsPicker
              initValue={trocItem.quality}
              onPressItem={setQuality}
              items={getQualityItems}
              numberOfColumn={3}
            />
          </>
        )}
        <View style={styles.firstInputContainer}>
          <MyTextInput
            title={i18n.t('TROC_ITEM_CREATE_FORM_DESCRIPTION')}
            onChangeText={formik.handleChange(FORM.DESCRIPTION)}
            onBlur={formik.handleBlur(FORM.DESCRIPTION)}
            value={formik.values.description}
            error={formik.errors.description}
            multiline
          />
        </View>

        <MyTextInput
          title={i18n.t('TROC_ITEM_CREATE_FORM_PRICE')}
          onChangeText={formik.handleChange(FORM.PRICE)}
          onBlur={formik.handleBlur(FORM.PRICE)}
          value={formik.values.price}
          error={formik.errors.price}
          keyboardType={'numeric'}
        />
        {isOfferProduct && (
          <MyTextInput
            placeholder={i18n.t(
              'TROC_ITEM_CREATE_FORM_NEGOCIATE_DESCRIPTION_PLACEHOLDER',
            )}
            title={i18n.t('TROC_ITEM_CREATE_FORM_NEGOCIATE_DESCRIPTION')}
            onChangeText={formik.handleChange(FORM.NEGOCIATE_DESCRIPTION)}
            onBlur={formik.handleBlur(FORM.NEGOCIATE_DESCRIPTION)}
            value={formik.values.negociateDescription}
            error={formik.errors.negociateDescription}
            multiline
          />
        )}
        <View style={styles.firstInputContainer}>
          <LocationPicker
            title={i18n.t('TROC_ITEM_CREATE_FORM_ADDRESS')}
            getDataCallback={setAddress}
            initValue={trocItem.address}
            height={120}
          />
        </View>
        {isOfferProduct && (
          <>
            <TitleForm
              title={i18n.t('TROC_ITEM_CREATE_FORM_ITEM_PICKING_TITLE')}
            />
            <ListItemsPicker
              items={getPickingItems}
              onPressItem={setPicking}
              initValue={trocItem.picking}
            />
          </>
        )}
        <View style={styles.bottomSpace} />
        <Button
          mode="contained"
          onPress={() => {
            formik.handleSubmit();
          }}>
          {i18n.t('TROC_ITEM_UPDATE_FORM_SUBMIT')}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  divider: {marginTop: 20},
  firstInputContainer: {marginTop: 20},

  bottomSpace: {marginBottom: 20},
});

export default UpdateTrocItemForm;
