import * as Yup from 'yup';
import i18n from '../../../utils/i18n';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email(i18n.t('ERROR_FORM_EMAIL_NOT_VALID'))
    .required(i18n.t('ERROR_FORM_EMAIL_REQUIRED'))
    .label('Email'),
  password: Yup.string()
    .required(i18n.t('ERROR_FORM_PASSWORD_REQUIRED'))
    .min(4, i18n.t('ERROR_FORM_PASSWORD_NOT_VALID')),
});

export const createAccountSchema = Yup.object({
  name: Yup.string()
    .min(2, i18n.t('ERROR_FORM_NAME_NOT_VALID'))
    .required(i18n.t('ERROR_FORM_NAME_REQUIRED'))
    .label('Name'),
  email: Yup.string()
    .email(i18n.t('ERROR_FORM_EMAIL_NOT_VALID'))
    .required(i18n.t('ERROR_FORM_EMAIL_REQUIRED'))
    .label('Email'),
  password: Yup.string()
    .required(i18n.t('ERROR_FORM_PASSWORD_REQUIRED'))
    .min(4, i18n.t('ERROR_FORM_PASSWORD_NOT_VALID')),
});

export const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email(i18n.t('ERROR_FORM_EMAIL_NOT_VALID'))
    .required(i18n.t('ERROR_FORM_EMAIL_REQUIRED'))
    .label('Email'),
});

export const resetPasswordSchema = Yup.object({
  code: Yup.string()
    .required(i18n.t('ERROR_FORM_CODE_REQUIRED'))
    .min(3, i18n.t('ERROR_FORM_CODE_TOO_SHORT'))
    .max(4, i18n.t('ERROR_FORM_CODE_TOO_LONG')),
  newPassword: Yup.string()
    .required(i18n.t('ERROR_FORM_PASSWORD_REQUIRED'))
    .min(4, i18n.t('ERROR_FORM_PASSWORD_NOT_VALID')),
});
