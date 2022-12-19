declare module 'i18next' {
  var fallbacks: boolean
  var translations: {
    [keys: string]: any
  }
  var defaultLocale: string
  var locale: string
  function currentLocale(): string
  function t(
    key: 'welcome',
  ): 'Welcome to React Native BaseAppRN by TheCodingMachine'
  function t(key: 'actions.continue'): 'Continue'
  function t(
    key: 'example.helloUser',
    opts: {
      name: any
    },
  ): 'I am a fake user, my name is {{name}}'
  function t(key: 'example.labels.userId'): 'Enter a user id'
  function t(key: 'start.name'): 'TAXI T\u1EA2I TH\u00C0NH H\u01AFNG'
  function t(key: 'Login.name'): '\u0110\u0103ng   nh\u1EADp'
}

declare module '*.json' {
  const value: any
  export default value
}
