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
  function t(key: 'app.title'): 'TH\u00C0NH H\u01AFNG GROUP'
  function t(key: 'start.name'): 'TH\u00C0NH H\u01AFNG GROUP'
  function t(key: 'start.login'): '\u0110\u0103ng nh\u1EADp'
  function t(
    key: 'start.register',
  ): '\u0110\u0103ng k\u00FD t\u00E0i kho\u1EA3n'
  function t(key: 'Login.name'): '\u0110\u0103ng nh\u1EADp'
  function t(key: 'Login.title'): 'TH\u00C0NH H\u01AFNG GROUP'
  function t(
    key: 'Login.intro',
  ): 'Ch\u00E0o m\u1EEBng qu\u00FD kh\u00E1ch tr\u1EDF l\u1EA1i'
  function t(
    key: 'Login.placeholder.numberPhone',
  ): 'S\u1ED1 \u0111i\u1EC7n tho\u1EA1i'
  function t(key: 'Login.placeholder.password'): 'M\u1EADt kh\u1EA9u'
  function t(
    key: 'Login.message.numberPhoneRequire',
  ): 'Vui l\u00F2ng nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i'
  function t(
    key: 'Login.message.numberPhoneInvalid',
  ): 'S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\u00F4ng h\u1EE3p l\u1EC7'
  function t(
    key: 'Login.message.passwordRequire',
  ): 'Vui l\u00F2ng nh\u1EADp m\u1EADt kh\u1EA9u'
  function t(
    key: 'Login.message.lengthPassword',
  ): 'M\u1EADt kh\u1EA9u ph\u1EA3i t\u1EEB 6 - 20 k\u00FD t\u1EF1'
  function t(key: 'Login.forgetPassword'): 'Qu\u00EAn m\u1EADt kh\u1EA9u?'
  function t(key: 'Login.other'): 'Ho\u1EB7c \u0111\u0103ng nh\u1EADp b\u1EB1ng'
  function t(
    key: 'Login.create',
  ): 'B\u1EA1n ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?'
  function t(key: 'Register.name'): '\u0110\u0103ng k\u00FD'
  function t(key: 'Register.title'): 'TH\u00C0NH H\u01AFNG GROUP'
  function t(key: 'Register.intro'): 'Ch\u00E0o m\u1EEBng qu\u00FD kh\u00E1ch'
  function t(
    key: 'Register.request',
  ): 'Vui l\u00F2ng cung c\u1EA5p s\u1ED1 \u0111i\u1EC7n tho\u1EA1i c\u1EE7a b\u1EA1n \u0111\u1EC3 s\u1EED d\u1EE5ng c\u00E1c d\u1ECBch v\u1EE5 c\u1EE7a Th\u00E0nh H\u01B0ng.'
  function t(
    key: 'Register.placeholder.numberPhone',
  ): 'Nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i *'
  function t(key: 'Register.placeholder.name'): 'H\u1ECD v\u00E0 t\u00EAn *'
  function t(key: 'Register.placeholder.password'): 'M\u1EADt kh\u1EA9u *'
  function t(key: 'Register.placeholder.email'): 'Email *'
  function t(key: 'Register.placeholder.address'): '\u0110\u1ECBa ch\u1EC9 *'
  function t(
    key: 'Register.message.numberPhoneRequire',
  ): 'Vui l\u00F2ng nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i'
  function t(
    key: 'Register.message.numberPhoneInvalid',
  ): 'S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\u00F4ng h\u1EE3p l\u1EC7'
  function t(
    key: 'Register.message.nameRequire',
  ): 'Vui l\u00F2ng nh\u1EADp h\u1ECD v\u00E0 t\u00EAn'
  function t(
    key: 'Register.message.passwordRequire',
  ): 'Vui l\u00F2ng nh\u1EADp m\u1EADt kh\u1EA9u'
  function t(
    key: 'Register.message.emailRequire',
  ): 'Vui l\u00F2ng nh\u1EADp email'
  function t(
    key: 'Register.message.emailInvalid',
  ): 'Email kh\u00F4ng h\u1EE3p l\u1EC7'
  function t(
    key: 'Register.message.addressRequire',
  ): 'Vui l\u00F2ng nh\u1EADp \u0111\u1ECBa ch\u1EC9'
  function t(key: 'Register.alert.notify'): 'Th\u00F4ng b\u00E1o'
  function t(
    key: 'Register.alert.success',
  ): '\u0110\u0103ng k\u00FD th\u00E0nh c\u00F4ng'
  function t(
    key: 'Register.alert.terms',
  ): 'Qu\u00FD kh\u00E1ch ch\u01B0a \u0111\u1ED3ng \u00FD \u0111i\u1EC1u kho\u1EA3n \u0111i\u1EC1u ki\u1EC7n'
  function t(
    key: 'Register.termsAndService.text1',
  ): 'T\u00F4i \u0111\u1ED3ng \u00FD v\u1EDBi v\u1EDBi '
  function t(
    key: 'Register.termsAndService.text2',
  ): '\u0110i\u1EC1u kho\u1EA3n '
  function t(key: 'Register.termsAndService.text3'): 'v\u00E0 '
  function t(key: 'Register.termsAndService.text4'): 'Ch\u00EDnh s\u00E1ch '
  function t(key: 'Register.termsAndService.text5'): 'b\u1EA3o m\u1EADt '
  function t(
    key: 'Register.termsAndService.text6',
  ): 'c\u1EE7a Th\u00E0nh H\u01B0ng'
  function t(
    key: 'Register.SMSConfirm',
  ): 'H\u1EC7 th\u1ED1ng g\u1EEDi SMS \u0111\u1EC3 x\u00E1c nh\u1EADn.'
  function t(
    key: 'Register.other',
  ): 'Ho\u1EB7c \u0111\u0103ng nh\u1EADp b\u1EB1ng'
  function t(
    key: 'Register.hadAccount',
  ): 'B\u1EA1n \u0111\u00E3 c\u00F3 t\u00E0i kho\u1EA3n?'
  function t(
    key: 'registerSuccess.title',
  ): 'Ch\u00FAc m\u1EEBng qu\u00FD kh\u00E1ch \u0111\u00E3 \u0111\u0103ng k\u00FD t\u00E0i kho\u1EA3n th\u00E0nh c\u00F4ng'
  function t(
    key: 'registerSuccess.request',
  ): 'Vui l\u00F2ng \u0111\u0103ng nh\u1EADp \u0111\u1EC3 s\u1EED d\u1EE5ng c\u00E1c d\u1ECBch v\u1EE5 c\u1EE7a Th\u00E0nh H\u01B0ng'
  function t(
    key: 'AdviseAndSurvey.header',
  ): 'T\u01B0 v\u1EA5n v\u00E0 kh\u1EA3o s\u00E1t'
  function t(
    key: 'AdviseAndSurvey.intro',
  ): 'B\u1EA1n c\u1EA7n t\u01B0 v\u1EA5n v\u00E0 kh\u1EA3o s\u00E1t tr\u1EF1c ti\u1EBFp \u0111\u1ECBa \u0111i\u1EC3m? B\u1EA1n ch\u01B0a bi\u1EBFt l\u1EF1a ch\u1ECDn xe ph\u00F9 h\u1EE3p? H\u00E3y \u0111\u1EC3 ch\u00FAng t\u00F4i t\u01B0 v\u1EA5n cho b\u1EA1n nhanh ch\u00F3ng v\u00E0 ch\u00EDnh x\u00E1c nh\u1EA5t.'
  function t(
    key: 'AdviseAndSurvey.label.address',
  ): '\u0110i\u1EC3m kh\u1EA3o s\u00E1t'
  function t(
    key: 'AdviseAndSurvey.label.contactName',
  ): 'Ng\u01B0\u1EDDi li\u00EAn h\u1EC7'
  function t(
    key: 'AdviseAndSurvey.label.numberPhone',
  ): 'S\u1ED1 \u0111i\u1EC7n tho\u1EA1i li\u00EAn h\u1EC7'
  function t(
    key: 'AdviseAndSurvey.label.date',
  ): 'Th\u1EDDi gian h\u1EB9n kh\u1EA3o s\u00E1t'
  function t(
    key: 'AdviseAndSurvey.message.addressRequire',
  ): 'Vui l\u00F2ng nh\u1EADp \u0111\u1ECBa ch\u1EC9'
  function t(
    key: 'AdviseAndSurvey.message.contactNameRequire',
  ): 'Vui l\u00F2ng nh\u1EADp t\u00EAn li\u00EAn h\u1EC7'
  function t(
    key: 'AdviseAndSurvey.message.numberPhoneRequire',
  ): 'Vui l\u00F2ng nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i'
  function t(
    key: 'AdviseAndSurvey.message.numberPhoneInvalid',
  ): 'S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\u00F4ng h\u1EE3p l\u1EC7'
  function t(
    key: 'AdviseAndSurvey.message.dateRequire',
  ): 'Vui l\u00F2ng ch\u1ECDn th\u1EDDi gian'
  function t(key: 'AdviseAndSurvey.done'): 'Xong'
  function t(
    key: 'OrderSuccess.header',
  ): '\u0110\u1EB7t d\u1ECBch v\u1EE5 th\u00E0nh c\u00F4ng'
  function t(
    key: 'OrderSuccess.title',
  ): '\u0110\u1EB7t d\u1ECBch v\u1EE5 th\u00E0nh c\u00F4ng'
  function t(
    key: 'OrderSuccess.content',
  ): 'It is a long established fact that a reader will be distracted by the readable content of a page'
  function t(
    key: 'OrderSuccess.AdviseAndSurvey.header',
  ): '\u0110\u1EB7t giao h\u00E0ng th\u00E0nh c\u00F4ng'
  function t(
    key: 'OrderSuccess.AdviseAndSurvey.title',
  ): '\u0110\u01A1n h\u00E0ng c\u1EE7a b\u1EA1n \u0111ang \u0111\u01B0\u1EE3c x\u1EED l\u00FD'
  function t(key: 'DetailQuotes.header'): 'B\u00E1o gi\u00E1 chi ti\u1EBFt'
  function t(
    key: 'DetailQuotes.header2',
  ): 'Danh s\u00E1ch \u0111\u1ED3 \u0111\u1EA1c'
  function t(
    key: 'DetailQuotes.title',
  ): 'Danh s\u00E1ch \u0111\u1ED3 \u0111\u1EA1c c\u1EA7n v\u1EADn chuy\u1EC3n'
  function t(key: 'DetailQuotes.amount'): 'S\u1ED1 l\u01B0\u1EE3ng'
  function t(key: 'DetailQuotes.unitPrice'): '\u0110\u01A1n gi\u00E1'
  function t(key: 'DetailQuotes.intoMoney'): 'Th\u00E0nh ti\u1EC1n'
  function t(key: 'DetailQuotes.charges'): 'C\u01B0\u1EDBc ph\u00ED'
  function t(key: 'DetailQuotes.VAT'): 'VAT'
  function t(key: 'DetailQuotes.total'): 'T\u1ED4NG'
  function t(key: 'DetailQuotes.agree'): '\u0110\u1ED3ng \u00FD'
  function t(key: 'Notification.header'): 'Th\u00F4ng b\u00E1o'
  function t(key: 'Notification.noti'): 'Th\u00F4ng b\u00E1o'
  function t(key: 'Notification.messager'): 'Tin nh\u1EAFn'
  function t(key: 'Notification.shipment'): 'Chuy\u1EBFn h\u00E0ng'
  function t(
    key: 'Notification.noNoti',
  ): 'Kh\u00F4ng c\u00F3 th\u00F4ng b\u00E1o'
  function t(
    key: 'Notification.noMessage',
  ): 'B\u1EA1n kh\u00F4ng c\u00F3 tin nh\u1EAFn'
  function t(key: 'AdviseSelectCar.header'): 'T\u01B0 v\u1EA5n ch\u1ECDn xe'
  function t(
    key: 'AdviseSelectCar.title',
  ): 'S\u1EED d\u1EE5ng d\u1ECBch v\u1EE5 t\u01B0 v\u1EA5n mi\u1EC5n ph\u00ED c\u1EE7a Th\u00E0nh H\u01B0ng'
  function t(key: 'AdviseSelectCar.call'): 'G\u1ECDi \u0111i\u1EC7n'
  function t(key: 'AdviseSelectCar.texting'): 'Nh\u1EAFn tin'
  function t(key: 'BookingCar.header'): 'T\u1EF1 ch\u1ECDn xe'
  function t(
    key: 'BookingCar.title',
  ): 'Danh s\u00E1ch xe do Th\u00E0nh H\u01B0ng cung c\u1EA5p'
  function t(key: 'BookingCar.chooseCar'): 'Ch\u1ECDn xe'
  function t(
    key: 'DetailsOrderCompleted.header',
  ): 'Chi ti\u1EBFt chuy\u1EBFn h\u00E0ng '
  function t(
    key: 'DetailsOrderCompleted.vehiclesAndServices',
  ): 'Ph\u01B0\u01A1ng ti\u1EC7n v\u00E0 d\u1ECBch v\u1EE5'
  function t(
    key: 'DetailsOrderCompleted.deliveryCharges',
  ): 'Ph\u00ED giao h\u00E0ng'
  function t(key: 'DetailsOrderCompleted.transport'): 'V\u1EADn chuy\u1EC3n: '
  function t(
    key: 'DetailsOrderCompleted.billDriver',
  ): 'H\u00F3a \u0111\u01A1n t\u1EEB t\u00E0i x\u1EBF'
  function t(key: 'DetailsOrderCompleted.realTotal'): 'T\u1ED5ng th\u1EF1c thu'
  function t(key: 'DetailsOrderCompleted.notPay'): 'Ch\u01B0a thanh to\u00E1n'
  function t(
    key: 'DetailsOrderCompleted.feeContract',
  ): 'Ph\u00ED theo h\u1EE3p \u0111\u1ED3ng'
  function t(
    key: 'DetailsOrderCompleted.freight',
  ): 'C\u01B0\u1EDBc v\u1EADn chuy\u1EC3n'
  function t(key: 'DetailsOrderCompleted.additional'): 'Ph\u1EE5 tr\u1ED9i'
  function t(key: 'DetailsOrderCompleted.stevedore'): 'B\u1ED1c x\u1EBFp'
  function t(key: 'DetailsOrderCompleted.total'): 'T\u1ED5ng'
  function t(
    key: 'DetailsOrderCompleted.payment',
  ): 'H\u00ECnh th\u1EE9c thanh to\u00E1n'
  function t(
    key: 'DetailsOrderCompleted.directPayment',
  ): 'Thanh to\u00E1n tr\u1EF1c ti\u1EBFp khi giao h\u00E0ng'
  function t(
    key: 'DetailsOrderCompleted.appPayment',
  ): 'T\u00EDnh ti\u1EC1n theo app'
  function t(
    key: 'DetailsOrderCompleted.orderCode',
  ): 'M\u00E3 \u0111\u01A1n h\u00E0ng'
  function t(
    key: 'DetailsOrderCompleted.timeBooking',
  ): 'Th\u1EDDi gian \u0111\u1EB7t d\u1ECBch v\u1EE5'
  function t(
    key: 'DetailsOrderCompleted.timeReceive',
  ): 'T\u00E0i x\u1EBF \u0111\u1EBFn \u0111i\u1EC3m l\u1EA5y h\u00E0ng'
  function t(
    key: 'DetailsOrderCompleted.timeStart',
  ): 'B\u1EAFt \u0111\u1EA7u chuy\u1EBFn h\u00E0ng'
  function t(
    key: 'DetailsOrderCompleted.timeFinish',
  ): 'Ho\u00E0n th\u00E0nh chuy\u1EBFn h\u00E0ng'
  function t(
    key: 'DetailsOrderCompleted.unknown',
  ): 'Kh\u00F4ng x\u00E1c \u0111\u1ECBnh'
  function t(key: 'DetailsOrderCompleted.payNow'): 'Thanh to\u00E1n ngay'
  function t(key: 'DetailsOrderCompleted.Unpaid'): 'Ch\u01B0a thanh to\u00E1n'
  function t(key: 'DetailsOrderCompleted.message.title'): 'Ho\u00E0n th\u00E0nh'
  function t(
    key: 'DetailsOrderCompleted.message.intro',
  ): '\u0110\u00E1nh gi\u00E1 d\u1ECBch v\u1EE5 c\u1EE7a Th\u00E0nh H\u01B0ng \u0111\u1EC3 ch\u00FAng t\u00F4i c\u00F3 th\u1EC3 ph\u1EE5c v\u1EE5 kh\u00E1ch h\u00E0ng m\u1ED9t c\u00E1ch t\u1ED1t nh\u1EA5t!'
  function t(
    key: 'DetailsOrderCompleted.message.evaluation',
  ): '\u0110\u00E1nh gi\u00E1'
  function t(
    key: 'DetailsOrderCompleted.feeFitment',
  ): 'Chi ph\u00ED \u0111\u1ED3 \u0111\u1EA1c v\u1EADn chuy\u1EC3n'
  function t(
    key: 'DetailsOrderCompleted.feePack',
  ): 'Chi ph\u00ED v\u1EADn chuy\u1EC3n \u0111\u00F3ng g\u00F3i'
  function t(
    key: 'DetailsOrderCompleted.totalFee',
  ): 'Chi ph\u00ED chuy\u1EC3n tr\u1ECDn g\u00F3i'
  function t(
    key: 'Evaluation.title',
  ): '\u0110\u00E1nh gi\u00E1 d\u1ECBch v\u1EE5 Taxi t\u1EA3i Th\u00E0nh H\u01B0ng'
  function t(
    key: 'Evaluation.applications',
  ): 'D\u1ECBch v\u1EE5 \u1EE9ng d\u1EE5ng \u0111\u1EB7t chuy\u1EBFn'
  function t(
    key: 'Evaluation.driver',
  ): 'T\u00E0i x\u1EBF v\u00E0 d\u1ECBch v\u1EE5 v\u1EADn chuy\u1EC3n'
  function t(key: 'Evaluation.finish'): 'Ho\u00E0n th\u00E0nh'
  function t(
    key: 'Evaluation.customerFeedback',
  ): '\u00DD ki\u1EBFn c\u1EE7a kh\u00E1ch h\u00E0ng'
  function t(
    key: 'Evaluation.alert',
  ): 'Vui l\u00F2ng \u0111\u00E1nh gi\u00E1 cho d\u1ECBch v\u1EE5 c\u1EE7a ch\u00FAng t\u00F4i'
  function t(key: 'ConfirmDelivery.header'): 'X\u00E1c nh\u1EADn th\u00F4ng tin'
  function t(
    key: 'ConfirmDelivery.alert',
  ): 'B\u1EA1n ch\u01B0a ch\u1ECDn ph\u01B0\u01A1ng th\u1EE9c thanh to\u00E1n!'
  function t(key: 'ConfirmDelivery.promotion'): 'Khuy\u1EBFn m\u1EA1i'
  function t(
    key: 'ConfirmDelivery.enterPromotion',
  ): 'Nh\u1EADp m\u00E3 khuy\u1EBFn m\u1EA1i'
  function t(key: 'ConfirmDelivery.apply'): '\u00C1p d\u1EE5ng'
  function t(key: 'ConfirmDelivery.choose'): 'Ch\u1ECDn'
  function t(key: 'ConfirmDelivery.VND'): ' VND'
  function t(key: 'ConfirmDelivery.buttonComplete'): '\u0110\u1EB7t chuy\u1EBFn'
  function t(key: 'ConfirmDelivery.total'): 'T\u1ED5ng ph\u00ED'
  function t(key: 'ConfirmDelivery.cost'): 'Ph\u00ED chuy\u1EBFn h\u00E0ng'
  function t(
    key: 'ConfirmDelivery.yourPromo',
  ): 'M\u00E3 gi\u1EA3m gi\u00E1 c\u1EE7a b\u1EA1n'
  function t(key: 'ConfirmDelivery.discount'): 'Gi\u1EA3m gi\u00E1'
  function t(key: 'ConfirmDelivery.maxDiscount'): 'Gi\u1EA3m t\u1ED1i \u0111a'
  function t(key: 'ConfirmDelivery.finish'): 'Ho\u00E0n th\u00E0nh'
  function t(key: 'MapViewPicker.update'): 'C\u1EADp nh\u1EADt'
  function t(key: 'MapViewPicker.location'): '\u0110\u1ECBa \u0111i\u1EC3m'
  function t(
    key: 'MapViewPicker.locationName',
  ): 'T\u00EAn \u0111\u1ECBa \u0111i\u1EC3m'
  function t(key: 'MapViewPicker.contact'): 'Ng\u01B0\u1EDDi li\u00EAn h\u1EC7'
  function t(
    key: 'MapViewPicker.phoneContact',
  ): 'S\u1ED1 \u0111i\u1EC7n tho\u1EA1i li\u00EAn h\u1EC7'
  function t(key: 'MapViewPicker.note'): 'Ghi ch\u00FA cho t\u00E0i x\u1EBF'
  function t(
    key: 'MapViewPicker.alert.title',
  ): 'C\u1EA3nh b\u00E1o \u26A0\uFE0F'
  function t(
    key: 'MapViewPicker.alert.content',
  ): 'B\u1EA1n mu\u1ED1n x\u00F3a \u0111\u1ECBa \u0111i\u1EC3m n\u00E0y?'
  function t(
    key: 'MapViewPicker.message.contactRequire',
  ): 'Vui l\u00F2ng nh\u1EADp t\u00EAn li\u00EAn h\u1EC7'
  function t(
    key: 'MapViewPicker.message.phoneRequire',
  ): 'Vui l\u00F2ng nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i li\u00EAn h\u1EC7'
  function t(
    key: 'MapViewPicker.message.addressRequire',
  ): 'Vui l\u00F2ng ch\u1ECDn \u0111\u1ECBa \u0111i\u1EC3m'
  function t(
    key: 'MapViewPicker.deleteLocation',
  ): 'X\u00F3a \u0111\u1ECBa \u0111i\u1EC3m'
  function t(
    key: 'NewDeliveryOrder.contactDriver',
  ): 'Li\u00EAn l\u1EA1c v\u1EDBi t\u00E0i x\u1EBF chuy\u1EBFn h\u00E0ng'
  function t(key: 'NewDeliveryOrder.findDriver'): 'T\u00ECm t\u00E0i x\u1EBF'
  function t(key: 'NewDeliveryOrder.cancelDelivery'): 'H\u1EE7y chuy\u1EBFn'
  function t(
    key: 'NewDeliveryOrder.newDelivery',
  ): 'Chuy\u1EBFn h\u00E0ng m\u1EDBi'
  function t(key: 'WaitingDeliveryOrder.status'): '\u0110ang giao h\u00E0ng'
  function t(key: 'WaitingDeliveryOrder.viewPrice'): 'Xem b\u00E1o gi\u00E1'
  function t(
    key: 'WaitingDeliveryOrder.viewContract',
  ): 'Xem h\u1EE3p \u0111\u1ED3ng'
  function t(key: 'CancelDeliveryOrder.status'): 'H\u1EE7y'
  function t(key: 'FailDeliveryOrder.status'): 'Th\u1EA5t b\u1EA1i'
  function t(key: 'WaitingAdviseOrder.status'): 'Ch\u1EDD t\u01B0 v\u1EA5n'
  function t(
    key: 'WaitingAdviseOrder.adviseInfo',
  ): 'Th\u00F4ng tin h\u1EB9n t\u01B0 v\u1EA5n'
  function t(
    key: 'WaitingAdviseOrder.surveyLocation',
  ): '\u0110\u1ECBa \u0111i\u1EC3m kh\u1EA3o s\u00E1t'
  function t(
    key: 'WaitingAdviseOrder.contactHuman',
  ): 'Ng\u01B0\u1EDDi li\u00EAn h\u1EC7'
  function t(
    key: 'WaitingAdviseOrder.telephoneContact',
  ): 'S\u1ED1 \u0111i\u1EC7n tho\u1EA1i li\u00EAn h\u1EC7'
  function t(
    key: 'WaitingAdviseOrder.surveyAppointmentTime',
  ): 'Th\u1EDDi gian h\u1EB9n kh\u1EA3o s\u00E1t'
  function t(key: 'AdviseOrder.status'): '\u0110\u00E3 t\u01B0 v\u1EA5n'
  function t(key: 'CancelReason.title'): 'L\u00FD do h\u1EE7y chuy\u1EBFn'
  function t(
    key: 'CancelReason.alert',
  ): 'Vui l\u00F2ng ch\u1ECDn l\u00FD do h\u1EE7y chuy\u1EBFn'
  function t(key: 'CancelReason.submit'): 'X\u00E1c nh\u1EADn'
  function t(
    key: 'SendAndReceiveInfo.name',
  ): 'Th\u00F4ng tin g\u1EEDi v\u00E0 nh\u1EADn'
  function t(key: 'SendAndReceiveInfo.sender'): 'Ng\u01B0\u1EDDi g\u1EEDi'
  function t(key: 'SendAndReceiveInfo.receiver'): 'Ng\u01B0\u1EDDi nh\u1EADn'
  function t(
    key: 'OTP.alert',
  ): '\u0110\u00E3 g\u1EEDi l\u1EA1i otp. Vui l\u00F2ng ch\u1EDD trong gi\u00E2y l\u00E1t!'
  function t(
    key: 'OTP.checkSMS',
  ): 'Vui l\u00F2ng ki\u1EC3m tra SMS \u0111\u1EC3 l\u1EA5y th\u00F4ng tin m\u00E3 OTP'
  function t(key: 'OTP.codeExpired'): 'M\u00E3 \u0111\u00E3 h\u1EBFt h\u1EA1n'
  function t(key: 'OTP.reSend'): 'G\u1EEDi l\u1EA1i'
  function t(key: 'OTP.phone'): 'S\u1ED1 \u0111i\u1EC7n tho\u1EA1i'
  function t(key: 'OTP.login'): '\u0110\u0103ng nh\u1EADp'
  function t(key: 'OTP.confirm'): 'X\u00E1c nh\u1EADn'
  function t(
    key: 'OTP.chagePhone',
  ): 'Ch\u1EC9nh s\u1EEDa s\u1ED1 \u0111i\u1EC7n tho\u1EA1i'
  function t(key: 'OTP.reSendCode'): 'G\u1EEDi l\u1EA1i m\u00E3'
  function t(key: 'Chat.input'): 'Aa...'
  function t(
    key: 'HelpCenter.header',
  ): 'Th\u00E0nh H\u01B0ng tr\u1EE3 gi\u00FAp'
  function t(key: 'HelpCenter.title1'): 'Hotline H\u00E0 N\u1ED9i'
  function t(key: 'HelpCenter.title2'): 'Hotline TP. H\u1ED3 Ch\u00ED Minh'
  function t(
    key: 'HelpCenter.title3',
  ): 'T\u1ED5ng \u0111\u00E0i t\u01B0 v\u1EA5n mi\u1EC5n ph\u00ED H\u00E0 n\u1ED9i v\u00E0 H\u1ED3 Ch\u00ED Minh'
  function t(key: 'HelpCenter.phone1'): '024.38.733.733'
  function t(key: 'HelpCenter.phone2'): '024.38.73.13.13'
  function t(key: 'HelpCenter.phone3'): '028.54.360.360'
  function t(key: 'HelpCenter.phone4'): '028.39.876.876'
  function t(key: 'HelpCenter.phone5'): '1800.00.33'
  function t(key: 'CallScreen.header1'): 'Cu\u1ED9c g\u1ECDi \u0111\u1EBFn'
  function t(key: 'CallScreen.header2'): 'Cu\u1ED9c g\u1ECDi \u0111i'
  function t(key: 'CallScreen.status1'): '\u0110ang g\u1ECDi b\u1EA1n'
  function t(key: 'CallScreen.status2'): 'B\u1EA1n \u0111ang g\u1ECDi'
  function t(key: 'CallScreen.accept'): 'Ch\u1EA5p nh\u1EADn'
  function t(key: 'CallScreen.refuse'): 'T\u1EEB ch\u1ED1i'
  function t(key: 'CallScreen.end'): 'K\u1EBFt th\u00FAc'
}

declare module '*.json' {
  const value: any
  export default value
}
