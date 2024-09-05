import * as Yup from 'yup';
import i18n from '../../../utils/i18n';

export const updateProfileSchema = Yup.object({
  name: Yup.string()
    .required(i18n.t('ERROR_FORM_NAME_REQUIRED'))
    .min(2, i18n.t('ERROR_FORM_NAME_NOT_VALID')),
  baseline: Yup.string().nullable().notRequired(),
});
