import {formatDistanceToNow, Locale} from 'date-fns';
import {fr, enUS} from 'date-fns/locale';
import {getLocales} from 'react-native-localize';

export const getTimeAgo = (date: Date | string) => {
  const locales = getLocales();
  const locale: Locale = locales[0].languageCode === 'fr' ? fr : enUS;
  const updatedDate = new Date(date || '');
  return formatDistanceToNow(updatedDate, {addSuffix: true, locale});
};
