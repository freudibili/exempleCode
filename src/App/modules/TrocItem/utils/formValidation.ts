import * as Yup from 'yup';
import i18n from '../../../utils/i18n';

export const CreateItemSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, i18n.t('ERROR_FORM_TROC_ITEM_FORM_TITLE_TOO_SHORT'))
    .max(100, i18n.t('ERROR_FORM_TROC_ITEM_FORM_TITLE_TOO_LONG'))
    .required(i18n.t('ERROR_FORM_TROC_ITEM_FORM_TITLE_REQUIRED')),
  description: Yup.string()
    .min(2, i18n.t('ERROR_FORM_TROC_ITEM_FORM_DESCRIPTION_TOO_SHORT'))
    .max(600, i18n.t('ERROR_FORM_TROC_ITEM_FORM_DESCRIPTION_TOO_LONG')),
  price: Yup.number()
    .typeError(i18n.t('ERROR_FORM_TROC_ITEM_FORM_PRICE_NAN'))
    .max(999, i18n.t('ERROR_FORM_TROC_ITEM_FORM_PRICE_TOO_LONG')),
});

const imageDataTypeSchema = Yup.object().shape({
  uri: Yup.string(),
});

export const CreateProductInfoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, i18n.t('ERROR_FORM_TROC_ITEM_FORM_TITLE_TOO_SHORT'))
    .max(100, i18n.t('ERROR_FORM_TROC_ITEM_FORM_TITLE_TOO_LONG'))
    .required(i18n.t('ERROR_FORM_TROC_ITEM_FORM_TITLE_REQUIRED')),
  imagesData: Yup.array()
    .of(imageDataTypeSchema)
    .min(1, i18n.t('ERROR_FORM_TROC_ITEM_FORM_IMAGE_REQUIRED')),
  categoriesId: Yup.array().min(
    1,
    i18n.t('ERROR_FORM_TROC_ITEM_FORM_CATEGORY_REQUIRED'),
  ),
});

export const CreateProductQualitySchema = Yup.object().shape({
  quality: Yup.string().min(
    1,
    i18n.t('ERROR_FORM_TROC_ITEM_FORM_TITLE_TOO_SHORT'),
  ),
  condition: Yup.string().min(
    1,
    i18n.t('ERROR_FORM_TROC_ITEM_FORM_TITLE_TOO_SHORT'),
  ),
  description: Yup.string().max(
    600,
    i18n.t('ERROR_FORM_TROC_ITEM_FORM_DESCRIPTION_TOO_LONG'),
  ),
});

export const CreateProductExchangeSchema = Yup.object().shape({
  price: Yup.number()
    .typeError(i18n.t('ERROR_FORM_TROC_ITEM_FORM_PRICE_NAN'))
    .max(999, i18n.t('ERROR_FORM_TROC_ITEM_FORM_PRICE_TOO_LONG')),
  negociateDescription: Yup.string().max(
    200,
    i18n.t('ERROR_FORM_TROC_ITEM_FORM_DESCRIPTION_TOO_LONG'),
  ),
});

export const CreateProductLocationSchema = Yup.object().shape({
  address: Yup.object().shape({
    formattedAddress: Yup.string()
      .required(i18n.t('ERROR_FORM_TROC_ITEM_FORM_ADDRESS_REQUIRED'))
      .min(1, i18n.t('ERROR_FORM_TROC_ITEM_FORM_ADDRESS_TOO_SHORT')),
  }),
});

export const CreateProductSchema = Yup.object().shape({
  ...CreateProductInfoSchema.fields,
  ...CreateProductQualitySchema.fields,
  ...CreateProductExchangeSchema.fields,
  ...CreateProductLocationSchema.fields,
});
