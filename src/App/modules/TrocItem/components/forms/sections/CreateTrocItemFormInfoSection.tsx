import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Portal, Text} from 'react-native-paper';
import {imageDataType} from '../../../../../../types/imageType';
import TrocItemImagePicker from '../../TrocItemImagePicker/TrocItemImagePicker';
import MyTextInput from '../../../../../components/MyTextInput/MyTextInput';
import {useFormik, useFormikContext} from 'formik';
import CategoriesPicker from '../../../../../components/Pickers/CategoriesPicker/CategoriesPicker';
import useImageClassification from '../../../../../../hooks/useImageClassification';
import {
  CreateOfferProductFormInfoValues,
  CreateOfferProductFormValues,
  createOfferProductInfoInitialValues,
} from '../../../types/createFormType';
import designSystem from '../../../../../utils/designSystem';
import Icon from 'react-native-vector-icons/Feather';
import {CreateProductInfoSchema} from '../../../utils/formValidation';
import {
  CreateTrocItemContentMethods,
  CreateTrocItemContentProps,
} from '../../../types/CreateTrocItemsType';
import TrocItemFormHeader from '../../TrocItemFormHeader/TrocItemFormHeader';
import i18n from '../../../../../utils/i18n';

const CreateTrocItemFormInfoSection = forwardRef<
  CreateTrocItemContentMethods,
  CreateTrocItemContentProps
>(({onValidate}, ref) => {
  const {values: contextValues, setValues: setContextValues} =
    useFormikContext<CreateOfferProductFormValues>();

  const {
    setFieldValue,
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
  } = useFormik<CreateOfferProductFormInfoValues>({
    validationSchema: CreateProductInfoSchema,
    initialValues: createOfferProductInfoInitialValues,
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

  const firstImage = useMemo(() => {
    return values.imagesData[0];
  }, [values.imagesData]);

  const {isLoading, imageCategoryId, imageLabel} =
    useImageClassification(firstImage);

  const selectedCategories: string[] = useMemo(() => {
    const hasContextCategories = contextValues.categoriesId.length > 0;
    const hasImageCategory = !!imageCategoryId;

    if (hasContextCategories || hasImageCategory) {
      if (hasContextCategories && hasImageCategory) {
        return [...contextValues.categoriesId, imageCategoryId];
      } else if (hasContextCategories) {
        return contextValues.categoriesId;
      } else {
        // If only image category is present, return it in an array
        return imageCategoryId ? [imageCategoryId] : [];
      }
    }

    return [];
  }, [contextValues.categoriesId, imageCategoryId]);

  const handleImageSelection = useCallback(
    (imagesData: imageDataType[]) => {
      setFieldValue('imagesData', imagesData);
    },
    [setFieldValue],
  );

  const handleCategoriesSelection = useCallback(
    (categories: string[]) => {
      setFieldValue('categoriesId', categories);
    },
    [setFieldValue],
  );

  useEffect(() => {
    if (contextValues.title || imageLabel) {
      setFieldValue('title', contextValues.title || imageLabel);
    }
  }, [setFieldValue, imageLabel, contextValues.title]);

  useEffect(() => {
    handleCategoriesSelection(selectedCategories);
  }, [setFieldValue, selectedCategories, handleCategoriesSelection]);

  const displayInfoBlock =
    Boolean(contextValues.title) || (firstImage && !isLoading);

  return (
    <View style={styles.contentContainer}>
      <Portal.Host>
        <TrocItemFormHeader
          title={i18n.t('TROC_ITEM_CREATE_FORM_INFO_TITLE')}
        />
        <TrocItemImagePicker
          getDataCallback={handleImageSelection}
          error={errors.imagesData as string}
          initValue={contextValues?.imagesData}
        />

        {displayInfoBlock ? (
          <View style={styles.info}>
            <View>
              <MyTextInput
                placeholder={i18n.t('TROC_ITEM_CREATE_FORM_TITLE_PLACEHOLDER')}
                title={i18n.t('TROC_ITEM_CREATE_FORM_TITLE')}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                error={errors.title}
              />
            </View>
            <View>
              <CategoriesPicker
                initValue={selectedCategories}
                getDataCallback={handleCategoriesSelection}
                showTitle
                error={errors.categoriesId as string}
                footer={<View style={styles.categoriesFooter} />}
              />
            </View>
          </View>
        ) : (
          <View style={styles.waitingInfo}>
            <View style={styles.waitingInfoIcon}>
              <Icon
                size={80}
                name={'maximize'}
                color={designSystem.theme.colors.onSurfaceDisabled}
              />
            </View>
            <Text style={styles.waitingInfoText}>
              {isLoading
                ? i18n.t('TROC_ITEM_CREATE_FORM_INFO_IMAGE_DETECTION')
                : i18n.t('TROC_ITEM_CREATE_FORM_INFO_NO_IMAGE')}
            </Text>
            {isLoading && (
              <ActivityIndicator style={styles.activityIndicator} />
            )}
          </View>
        )}
      </Portal.Host>
    </View>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headline: {
    width: '80%',
    marginBottom: 40,
  },
  imageContainer: {
    padding: 20,
  },
  imageDescription: {
    flex: 1,
    alignItems: 'center',
  },
  activityIndicator: {
    marginTop: 20,
  },
  info: {
    flex: 1,
    marginTop: 10,
  },
  waitingInfo: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  waitingInfoIcon: {
    marginTop: -40,
    marginBottom: 40,
  },
  waitingInfoText: {
    textAlign: 'center',
    width: '80%',
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
  categoriesFooter: {
    height: 170,
  },
});

export default memo(CreateTrocItemFormInfoSection);
