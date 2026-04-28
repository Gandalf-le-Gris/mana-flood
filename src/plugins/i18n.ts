import { createI18n } from 'vue-i18n'
import enMessages from '../i18n/en-US.json';
import frMessages from '../i18n/fr-FR.json';

const messages = {
  'fr-FR': frMessages,
  'en-GB': enMessages
}

export default createI18n({
  legacy: false,
  locale: 'fr-FR',
  fallbackLocale: 'fr-FR',
  messages,
})
