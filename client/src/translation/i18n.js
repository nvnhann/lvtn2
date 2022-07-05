import i18next from 'i18next';

import translationEN  from '../locales/en/translation.json';
import translationVI  from '../locales/vi/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    }
};

i18next
.init({
    resources,
    lng: 'vi',
    debug: false,
    interpolation: {
        escapeValue: false // not needed for react as it escapes by default
    }
})

export default i18next;


