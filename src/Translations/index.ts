import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ns1 from './resources/index'

export const defaultNS = 'ns1'
export const resources = {
  en: {
    ns1,
  },
} as const

// @ts-ignore:next-line
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  ns: ['ns1'],
  defaultNS,
})

export default i18n
