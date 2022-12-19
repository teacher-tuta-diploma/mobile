import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useTheme } from '@/Hooks'

import CountDown from 'react-native-countdown-component'
import { useStyleOTP } from './styles'
import { OTP } from '@/Components/OtpInput'
import {
  useHandleActiveUserMutation,
  useHandleRegisterSocialMutation,
  useHandleRegisterUserMutation,
  useHandleResendVerifyOtpMutation,
} from '@/Services/modules/users'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import { StackNavigationProp } from '@react-navigation/stack'
import { alertMessage } from '@/Config/alert.helper'
import Container from '@/Components/Container'
import RBSheet from 'react-native-raw-bottom-sheet'
import TextField from '@/Components/TextInput'
import { Touchable } from '@/Components/Touchable'
import Image from '@/Components/Image'
import { Controller, useForm } from 'react-hook-form'
import { useHandleChangePhoneOtpMutation } from '@/Services/modules/users'
import i18next from 'i18next'

const OtpScreen = () => {
  const {
    Layout,
    Gutters,
    Fonts,
    Colors,
    Common,
    FontFamily,
    MetricsSizes,
    Images,
  } = useTheme()
  const styles = useStyleOTP()
  const { params } = useRoute<RouteProp<RootStackParamList, 'OtpScreen'>>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      changePhone: params.phone.replace('+84', ''),
    },
  })
  const [, propsRegisterUser] = useHandleRegisterUserMutation({
    fixedCacheKey: 'RegisterUser',
  })
  const [handleActiveUser, propsActiveUser] = useHandleActiveUserMutation({
    fixedCacheKey: 'ActiveUser',
  })
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  console.log(
    '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 44 ~ OtpScreen ~ propsActiveUser',
    propsActiveUser,
  )
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  const [, registerSocial] = useHandleRegisterSocialMutation({
    fixedCacheKey: 'RegisterSocial',
  })
  const [handleResendOtp, propsResendOtp] = useHandleResendVerifyOtpMutation({
    fixedCacheKey: 'resendOtp',
  })
  /**
   * TODO thay đổi số điện thoại và gửi lại OTP
   */
  const [handleChangePhoneOtp, propsChangePhoneOtp] =
    useHandleChangePhoneOtpMutation({
      fixedCacheKey: 'changePhoneOtp',
    })
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'OtpScreen'>>()
  const refRBSheet = useRef<RBSheet>()

  const loading = useLoadingGlobal()
  const [codeOtp, setCodeOtp] = useState<string>('')
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  console.log(
    '🛠 LOG: 🚀 --> ~ file: OtpScreen.tsx ~ line 16 ~ OtpScreen ~ codeOtp',
    codeOtp,
    propsRegisterUser.data,
    registerSocial,
  )
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  const [time, setTime] = useState<number>(120)
  const [isCounterVisible, setIsCounterVisible] = useState(true)

  const timeRef = useRef<CountDown>()
  const afterCountdownMethod = () => {
    // do something here
    setIsCounterVisible(false)
  }

  /**
   * TODO resend otp , reset time , gửi lại otp có thay đổi số điện thoại
   */
  const onResendCode = (data: any) => {
    handleChangePhoneOtp({
      phone: '+84' + data.changePhone,
      id: params.id,
      callback() {
        setIsCounterVisible(false)
        setTimeout(() => {
          setTime(120)
          setIsCounterVisible(true)
        }, 1)
        refRBSheet?.current?.close()
        alertMessage(i18next.t('OTP.alert'))
      },
    })
  }

  /**
   * TODO resend otp , reset time , gửi lại otp
   */
  const onResendOtp = () => {
    handleResendOtp({
      phone: `${params.phone}`,
      callback() {
        setIsCounterVisible(false)
        setTimeout(() => {
          setTime(120)
          setIsCounterVisible(true)
        }, 1)
        alertMessage(i18next.t('OTP.alert'))
      },
    })
  }

  const onShowEditPhone = useCallback(() => {
    refRBSheet?.current?.open()
  }, [])

  /**
   * TODO  nhập 6 số rồi thì active user
   */
  useEffect(() => {
    if (codeOtp.length === 6) {
      handleActiveUser({
        activeCode: codeOtp,
        credentialId: params.credentialId,
      })
    }
  }, [codeOtp, handleActiveUser, params.credentialId])

  useEffect(() => {
    loading.toogleLoading?.(propsActiveUser.isLoading)
  }, [loading, propsActiveUser.isLoading])

  /**
   * TODO check nếu không thành công và có lỗi thì show lỗi
   */
  useEffect(() => {
    if (
      (!propsChangePhoneOtp.isSuccess || !propsResendOtp.isSuccess) &&
      propsActiveUser.error
    ) {
      alertMessage('Lỗi', propsActiveUser.error.data.error.message)
    }
  }, [
    propsActiveUser.error,
    propsChangePhoneOtp.isSuccess,
    propsResendOtp.isSuccess,
  ])

  /**
   * TODO check  công thì đi ra màn thành công
   */
  useEffect(() => {
    if (propsActiveUser.isSuccess) {
      navigation.replace('RegisterSuccess', {
        accessToken: propsActiveUser.data.accessToken,
      })
    }
  }, [navigation, propsActiveUser.data?.accessToken, propsActiveUser.isSuccess])

  /**
   * TODO check nếu không thành công và có lỗi thì show lỗi
   */
  useEffect(() => {
    if (!propsActiveUser.isSuccess && propsActiveUser.error) {
      alertMessage('Lỗi', propsActiveUser.error.data.error.message)
    }
  }, [propsActiveUser.error, propsActiveUser.isSuccess])

  /**
   * TODO ra khỏi màn này thì reset lại state về init
   */
  useEffect(() => {
    return () => {
      propsActiveUser.reset()
      propsRegisterUser.reset()
      propsResendOtp.reset()
      propsChangePhoneOtp.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[Layout.fill, Layout.colVCenter, Gutters.smallHPadding]}>
        <Text
          style={[
            Fonts.textLarge,
            Gutters.largeTMargin,
            Gutters.largeBMargin,
            { color: Colors.primary, fontFamily: FontFamily.NunitoBold },
          ]}
        >
          {i18next.t('app.title')}
        </Text>
        <View style={[Layout.alignItemsCenter]}>
          {/* <Text style={[Common.textColorPrimary, Fonts.textRegularBold]}>
          {t('login.title2')}
        </Text> */}
          {/* <Text
          style={[Fonts.textSmall, Gutters.bigx2TMargin, styles.titleTimeEnd]}
        >
          {t('login.smsOtpTittle')}
        </Text> */}
          <Text style={[Fonts.textSmall, { color: Colors.grey }]}>
            {i18next.t('OTP.checkSMS')}
          </Text>
          <OTP setCode={setCodeOtp} code={codeOtp} />
          <View style={[Layout.row, Layout.center, Gutters.largeTMargin]}>
            {isCounterVisible ? (
              <>
                {/* <Text style={[Common.textBlack, Fonts.textSmall]}>
                {t('login.timeEndTittle')}
              </Text> */}
                <CountDown
                  ref={timeRef as any}
                  size={15}
                  until={time}
                  onFinish={afterCountdownMethod}
                  digitStyle={styles.digitStyle}
                  timeLabelStyle={styles.timeLabelStyle}
                  timeToShow={['M', 'S']}
                  timeLabels={{ m: '', s: '' }}
                  showSeparator
                  id={'start'}
                />
              </>
            ) : (
              <Container flexDr="row">
                <Text style={styles.titleEnded}>
                  {i18next.t('OTP.codeExpired')}
                </Text>
                <TouchableOpacity onPress={onResendOtp}>
                  <Text style={styles.resendText}>
                    {i18next.t('OTP.reSend')}
                  </Text>
                </TouchableOpacity>
              </Container>
            )}
          </View>
        </View>
        {!isCounterVisible && (
          <Touchable
            onPress={onShowEditPhone}
            style={[
              Layout.absolute,
              {
                bottom: MetricsSizes.tiny,
              },
            ]}
            flexDr="row"
            ai="center"
          >
            <Image
              source={Images.pencil}
              resizeMode={'contain'}
              w={MetricsSizes.small}
              h={MetricsSizes.small}
            />
            <Text
              style={[
                Fonts.textRegular,
                Gutters.tinyLMargin,
                { color: Colors.blue },
              ]}
            >
              {i18next.t('OTP.chagePhone')}
            </Text>
          </Touchable>
        )}

        {/* @ts-ignore:next-line */}
        <RBSheet
          /* @ts-ignore:next-line */
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.4)',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderRadius: MetricsSizes.tiny,
            },
          }}
        >
          <Container
            h="90%"
            jc="space-between"
            flexDr="column"
            mh={MetricsSizes.tiny}
          >
            <Container>
              <Text
                style={[
                  Fonts.textMedium,
                  Gutters.tinyBMargin,
                  { color: Colors.black, fontFamily: FontFamily.NunitoBold },
                ]}
              >
                {i18next.t('OTP.phone')}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /([3|5|7|8|9])+([0-9]{8})\b/g,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={9}
                    keyboardType="numeric"
                    placeholder={i18next.t('Register.placeholder.numberPhone')}
                    renderLeftAccessory={() => {
                      return (
                        <Container mh={MetricsSizes.tiny} flexDr="row">
                          <Text
                            style={[
                              Fonts.textSmall,
                              { color: Colors.borderInput },
                            ]}
                          >
                            +84
                          </Text>
                        </Container>
                      )
                    }}
                    renderRightAccessory={() => {
                      return (
                        <Container mh={MetricsSizes.tiny}>
                          <Image
                            source={Images.phone}
                            w={MetricsSizes.tiny}
                            h={MetricsSizes.tiny}
                            resizeMode="contain"
                          />
                        </Container>
                      )
                    }}
                  />
                )}
                name="changePhone"
              />
              <Container style={[Gutters.tinyRMargin]}>
                {errors.changePhone &&
                  errors.changePhone.type === 'required' && (
                    <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                      {i18next.t('Register.message.numberPhoneRequire')}
                    </Text>
                  )}
                {errors.changePhone &&
                  errors.changePhone.type === 'pattern' && (
                    <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                      {i18next.t('Register.message.numberPhoneInvalid')}
                    </Text>
                  )}
              </Container>
            </Container>
            <TouchableOpacity
              onPress={handleSubmit(onResendCode)}
              style={[
                Common.button.rounded,
                {
                  backgroundColor: Colors.primary,
                  height: MetricsSizes.small * 2,
                },
                Gutters.tinyBMargin,
              ]}
            >
              <Text style={[Fonts.textRegular]}>
                {i18next.t('OTP.reSendCode')}
              </Text>
            </TouchableOpacity>
          </Container>
        </RBSheet>
      </View>
    </SafeAreaView>
  )
}

export default OtpScreen
