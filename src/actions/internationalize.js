import {
  CHANGE_LOCALE
} from '../containers/LanguageProvider/constants';


export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    payload: locale
  };
}

export default {};
