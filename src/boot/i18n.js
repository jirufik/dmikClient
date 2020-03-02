import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages
})

VueI18n.prototype.getChoiceIndex = function (n, opts) {
  if (this.locale === 'ru') {
    // unreadMessages: '0 непрочитанных сообщений | {n} непрочитанное сообщение | {n} непрочитанных сообщения | {n} непрочитанных сообщений',
    // unreadMessages: '0 непрочитанных сообщений | 1 непрочитанное сообщение | 4 непрочитанных сообщения | 5 непрочитанных сообщений',
    return n === 0 ? 0 : n % 10 === 1 && n % 100 !== 11 ? 1 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 2 : 3;
  }
}

export default ({app}) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export {i18n}
