import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useTheme } from '@/Hooks'

import CountDown from 'react-native-countdown-component'
import { useStyleOTP } from './styles'
import { OTP } from '@/Components/OtpInput'

import { navigate } from '@/Navigators/utils'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import Container from '@/Components/Container'
import RBSheet from 'react-native-raw-bottom-sheet'
import TextField from '@/Components/TextInput'
import {
  useHandleForgotPasswordMutation,
  useHandleResendVerifyOtpMutation,
  useHandleVerifyOtpMutation,
} from '@/Services/modules/users'
import { alertMessage } from '@/Config/alert.helper'
import i18next from 'i18next'

const OtpScreenForgotPassword = () => {
  const { Layout, Gutters, Fonts, Colors, Common, FontFamily, MetricsSizes } =
    useTheme()
  const styles = useStyleOTP()
  const refRBSheet = useRef<RBSheet>()
  const [, propsFotgotPassword] = useHandleForgotPasswordMutation({
    fixedCacheKey: 'forgotPassword',
  })
  const [handleVerifyOtp, propsVerifyOtp] = useHandleVerifyOtpMutation({
    fixedCacheKey: 'VerifyOtp',
  })
  const [handleResendOtp, propsResendOtp] = useHandleResendVerifyOtpMutation({
    fixedCacheKey: 'resendOtp',
  })

  const loading = useLoadingGlobal()
  const [codeOtp, setCodeOtp] = useState<string>('')

  const [time, setTime] = useState<number>(120)
  const [isCounterVisible, setIsCounterVisible] = useState(true)

  const timeRef = useRef<CountDown>()

  const afterCountdownMethod = () => {
    // do something here
    setIsCounterVisible(false)
  }

  const someOtherMethodWhichEnablesCounter = () => {
    propsFotgotPassword?.data?.key &&
      handleResendOtp({
        phone: propsFotgotPassword?.data?.key,
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

  useEffect(() => {
    loading.toogleLoading?.(propsVerifyOtp.isLoading)
  }, [loading, propsVerifyOtp.isLoading])

  useEffect(() => {
    if (propsVerifyOtp.isSuccess && propsVerifyOtp.data) {
      navigate('SetupPassword', {})
    }
  }, [propsVerifyOtp.data, propsVerifyOtp.isSuccess])

  useEffect(() => {
    if (codeOtp.length === 6) {
      handleVerifyOtp({
        code: codeOtp,
        phone: propsFotgotPassword?.data?.key ?? '',
      })
    }
  }, [codeOtp, codeOtp.length, handleVerifyOtp, propsFotgotPassword?.data?.key])

  useEffect(() => {
    return () => {
      propsVerifyOtp.reset()
      propsFotgotPassword.reset()
      propsResendOtp.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
                <TouchableOpacity onPress={someOtherMethodWhichEnablesCounter}>
                  <Text style={styles.resendText}>
                    {i18next.t('OTP.reSend')}
                  </Text>
                </TouchableOpacity>
              </Container>
            )}
          </View>
        </View>

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
              <TextField defaultValue={'value'} />
            </Container>
            <TouchableOpacity
              // onPress={handleSubmit(onLogin)}
              style={[
                Common.button.rounded,
                {
                  backgroundColor: Colors.primary,
                  height: MetricsSizes.small * 2,
                },
                Gutters.tinyBMargin,
              ]}
            >
              <Text style={[Fonts.textRegular]}>{i18next.t('OTP.login')}</Text>
            </TouchableOpacity>
          </Container>
        </RBSheet>
      </View>
    </SafeAreaView>
  )
}

export default OtpScreenForgotPassword
