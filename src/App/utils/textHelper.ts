import i18n from './i18n';

export const CapitalizeFirstLetter = (str: string) => {
  return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const getRatingMessage = (rating: number) => {
  let message = '';

  switch (rating) {
    case 0:
      message = i18n.t('APP_RATING_0_STAR');
      break;
    case 1:
      message = i18n.t('APP_RATING_1_STAR');
      break;
    case 2:
      message = i18n.t('APP_RATING_2_STAR');
      break;
    case 3:
      message = i18n.t('APP_RATING_3_STAR');
      break;
    case 4:
      message = i18n.t('APP_RATING_4_STAR');
      break;
    case 5:
      message = i18n.t('APP_RATING_5_STAR');
      break;
    default:
      break;
  }

  return message;
};
