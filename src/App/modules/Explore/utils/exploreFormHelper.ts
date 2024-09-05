import * as Yup from 'yup';
import i18n from '../../../utils/i18n';

export const orderTrocItemSchema = Yup.object({
  message: Yup.string()
    .required(i18n.t('ERROR_FORM_ORDER_FORM_MESSAGE_REQUIRED'))
    .min(5, i18n.t('ERROR_FORM_ORDER_FORM_MESSAGE_TOO_SHORT')),
});

export const negociateTrocItemSchema = Yup.object({
  price: Yup.number()
    .typeError(i18n.t('ERROR_FORM_TROC_ITEM_FORM_PRICE_NAN'))
    .max(999, i18n.t('ERROR_FORM_TROC_ITEM_FORM_PRICE_TOO_LONG')),
  message: Yup.string()
    .required(i18n.t('ERROR_FORM_ORDER_FORM_MESSAGE_REQUIRED'))
    .min(5, i18n.t('ERROR_FORM_ORDER_FORM_MESSAGE_TOO_SHORT')),
});
