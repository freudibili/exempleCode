// Formik x React Native example
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Divider} from 'react-native-paper';
import {useFormik} from 'formik';
import {CreateItemSchema} from '../../utils/formValidation';
import {imageDataType} from '../../../../../types/imageType';
import LocationPicker from '../../../../components/Pickers/LocationPicker';
import {
  TROC_ITEM_TROC_TYPE,
  TrocItemCreationFormType,
} from '../../types/TrocItemsType';
import CategoriesPicker from '../../../../components/Pickers/CategoriesPicker/CategoriesPicker';
import {AddressType} from '../../../../types/locationType';
import TrocItemImagePicker from '../TrocItemImagePicker/TrocItemImagePicker';
import TrocTypePicker from '../../../../components/Pickers/TrocTypePicker';
import CategoryTypePicker from '../../../../components/Pickers/CategoryTypePicker';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import {getTrocItemStatus} from '../../models/trocItemSelectors';
import {STATUS} from '../../../../types/storeTypes';
import {goBack} from '../../../../utils/navigationHelper';
import MyTextInput from '../../../../components/MyTextInput/MyTextInput';
import InfoSection from '../InfoSection/InfoSection';
import InfoButton from '../../../../components/Buttons/InfoButton/infoButton';
import designSystem from '../../../../utils/designSystem';
import i18n from '../../../../utils/i18n';

interface Props {
  getFormDataCallback: (createdItem: TrocItemCreationFormType) => void;
  initTrocTypeId?: string;
  initCategoryTypeId?: string;
}

const CreateTrocItemForm = ({
  getFormDataCallback,
  initTrocTypeId,
  initCategoryTypeId,
}: Props) => {
  const status = useAppSelector(getTrocItemStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [imagesData, setImagesData] = useState<imageDataType[]>([]);
  const [imageError, setImageError] = useState<string>('');
  const [address, setAddress] = useState<AddressType>();
  const [categoriesId, setCategoriesId] = useState<string[]>([]);
  const [trocTypeId, setTrocTypeId] = useState<string>(initTrocTypeId || '');
  const [categoryTypeId, setCategoryTypeId] = useState<string>(
    initCategoryTypeId || '',
  );
  const [categoryTypeError, setCategoryTypeError] = useState<
    string | undefined
  >(undefined);
  const [trocTypeError, setTrocTypeError] = useState<string | undefined>(
    undefined,
  );

  enum FORM {
    TITLE = 'title',
    PRICE = 'price',
    DESCRIPTION = 'description',
  }

  useEffect(() => {
    setIsLoading(status === STATUS.LOADING);
    if (status === STATUS.SUCCESS && isSend) {
      goBack();
    }
  }, [isSend, status]);

  const checkIfImageNeeded = useCallback(() => {
    if (trocTypeId === TROC_ITEM_TROC_TYPE.SEARCH_ID || imagesData.length > 0) {
      setImageError('');
      return true;
    }

    setImageError(i18n.t('ERROR_FORM_TROC_ITEM_FORM_IMAGE_REQUIRED'));
    return false;
  }, [imagesData.length, trocTypeId]);

  const handleTypeError = useCallback(() => {
    const categoryError =
      categoryTypeId.length < 1
        ? i18n.t('ERROR_FORM_TROC_ITEM_FORM_TYPE_REQUIRED')
        : undefined;
    const trocError =
      trocTypeId.length < 1
        ? i18n.t('ERROR_FORM_TROC_ITEM_FORM_TYPE_REQUIRED')
        : undefined;

    setCategoryTypeError(categoryError);
    setTrocTypeError(trocError);

    return !categoryError && !trocError;
  }, [categoryTypeId.length, trocTypeId.length]);

  const handleSubmit = useCallback(
    (formData: {title: string; price: string; description: string}) => {
      const isImageOk = checkIfImageNeeded();
      const isTypeOk = handleTypeError();

      const haveAllData = formData && address && isImageOk && isTypeOk;

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
        });
        setIsSend(true);
      }
    },
    [
      checkIfImageNeeded,
      handleTypeError,
      address,
      getFormDataCallback,
      categoriesId,
      imagesData,
      trocTypeId,
      categoryTypeId,
    ],
  );

  const formik = useFormik({
    validationSchema: CreateItemSchema,
    initialValues: {
      title: '',
      price: '',
      description: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: formData => {
      handleSubmit(formData);
    },
  });

  const GetTrocTypePicker = useCallback(() => {
    return !initTrocTypeId ? (
      <TrocTypePicker
        getDataCallback={setTrocTypeId}
        error={trocTypeError}
        initValue={trocTypeId}
      />
    ) : null;
  }, [initTrocTypeId, trocTypeError, trocTypeId]);

  const GetCategoryTypePicker = useCallback(() => {
    return !initCategoryTypeId ? (
      <CategoryTypePicker
        getDataCallback={setCategoryTypeId}
        error={categoryTypeError}
        initValue={categoryTypeId}
      />
    ) : null;
  }, [categoryTypeError, initCategoryTypeId, categoryTypeId]);

  return (
    // @TODO HANDLE WARNING : FLATLIST SHOULD NOT BE NESTED IN SCROLLVIEW
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={styles.container}>
        {(!initCategoryTypeId || !initTrocTypeId) && (
          <View style={styles.headerContainer}>
            <GetTrocTypePicker />
            <GetCategoryTypePicker />
            <Divider style={styles.divider} bold />
          </View>
        )}
        <View style={styles.contentContainer}>
          <TrocItemImagePicker
            getDataCallback={setImagesData}
            error={imageError}
          />
          <MyTextInput
            placeholder={i18n.t('TROC_ITEM_CREATE_FORM_TITLE_PLACEHOLDER')}
            title={i18n.t('TROC_ITEM_CREATE_FORM_TITLE')}
            onChangeText={formik.handleChange(FORM.TITLE)}
            onBlur={formik.handleBlur(FORM.TITLE)}
            value={formik.values.title}
            error={formik.errors.title}
          />
          <CategoriesPicker
            getDataCallback={setCategoriesId}
            horizontal
            showTitle
          />

          <MyTextInput
            placeholder={i18n.t('TROC_ITEM_CREATE_FORM_PRICE_PLACEHOLDER')}
            title={i18n.t('TROC_ITEM_CREATE_FORM_PRICE')}
            onChangeText={formik.handleChange(FORM.PRICE)}
            onBlur={formik.handleBlur(FORM.PRICE)}
            value={formik.values.price}
            error={formik.errors.price}
            keyboardType={'numeric'}
          />
          <View style={styles.infoButtonContainer}>
            <InfoButton size={18} />
          </View>
          <MyTextInput
            placeholder={i18n.t(
              'TROC_ITEM_CREATE_FORM_DESCRIPTION_PLACEHOLDER',
            )}
            title={i18n.t('TROC_ITEM_CREATE_FORM_DESCRIPTION')}
            onChangeText={formik.handleChange(FORM.DESCRIPTION)}
            onBlur={formik.handleBlur(FORM.DESCRIPTION)}
            value={formik.values.description}
            error={formik.errors.description}
            multiline
          />

          <View style={styles.locationPickerContainer}>
            <LocationPicker
              title={i18n.t('TROC_ITEM_CREATE_FORM_ADDRESS')}
              getDataCallback={setAddress}
              height={120}
            />
          </View>
          <InfoSection
            text={i18n.t('TROC_ITEM_CREATE_FORM_ADDRESS_INFO')}
            marginVertical={10}
          />

          <View style={styles.button}>
            <Button
              loading={isLoading}
              disabled={isLoading}
              mode="contained"
              onPress={() => {
                formik.handleSubmit();
              }}>
              {i18n.t('TROC_ITEM_CREATE_FORM_SUBMIT')}
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomStartRadius: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: designSystem.theme.colors.background,
    padding: 20,
  },
  divider: {marginTop: 20},
  infoButtonContainer: {flexDirection: 'row', justifyContent: 'flex-end'},
  locationPickerContainer: {marginTop: 20},
  button: {marginTop: 20},
});

export default CreateTrocItemForm;
