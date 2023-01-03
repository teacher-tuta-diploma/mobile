import { Text } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import { useHandleLoginMutation } from '@/Services/modules/users'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import Container from '@/Components/Container'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/Components/TextInput'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import KeyboardScrollView from '@/Components/KeyboardScrollView'
import { navigate } from '@/Navigators/utils'
import { scale } from 'react-native-utils-scale'
import i18next from 'i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { Touchable } from '@/Components/Touchable'
import useBottomSheet from '@/Hooks/useBottomSheet'
import { setAccessToken } from '@/Store/Authentication'
import { useDispatch } from 'react-redux'

const LoginContainer = () => {
  const { Fonts, Images, Colors, MetricsSizes } = useTheme()
  const insets = useSafeAreaInsets()
  const [handleLogin, { data, error, isError, status, reset }] =
    useHandleLoginMutation({
      fixedCacheKey: 'Login',
    })
  const bottomSheet = useBottomSheet()
  const dispatch = useDispatch()
  const loading = useLoadingGlobal()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
      password: '',
    },
  })

  const onLogin = useCallback(
    (data: any) => {
      // navigate('Main', {})
      // loading.toogleLoading?.(true)
      // handleLogin({
      //   phone:
      //     data.phone[0] === '0'
      //       ? `+84${data.phone.slice(1, data.phone.length)}`
      //       : `+84${data.phone}`,
      //   password: data.password,
      //   callback() {
      //     loading.toogleLoading?.(false)
      //   },
      // })
      dispatch(
        setAccessToken({
          accessToken: 'data?.accessToken',
        }),
      )
    },
    [dispatch],
  )

  const onLoginBiometric = useCallback(() => {
    bottomSheet.onShowBottomSheet?.(
      <Container flex={1}>
        <Container ai="center">
          <Text
            style={[
              Fonts.textMediumBold,
              { color: Colors.white, marginTop: MetricsSizes.regular },
            ]}
          >
            Xác nhận vân tay
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              { color: Colors.textSecondary, marginTop: MetricsSizes.tiny },
            ]}
          >
            Đăng nhập ứng dụng
          </Text>
          <Touchable mt={MetricsSizes.small * 3}>
            <Image
              source={Images.finger}
              w={MetricsSizes.large}
              h={MetricsSizes.large}
              resizeMode="contain"
              tintColor={Colors.secondary}
            />
          </Touchable>
        </Container>
        <Container
          position="absolute"
          bottom={insets.bottom}
          right={MetricsSizes.tiny}
          w={'100%'}
          ai="flex-end"
        >
          <Text style={[Fonts.textSmall, { color: Colors.textSecondary }]}>
            Quay lại
          </Text>
        </Container>
      </Container>,
    )
  }, [
    Colors.secondary,
    Colors.textSecondary,
    Colors.white,
    Fonts.textMediumBold,
    Fonts.textSmall,
    Images.finger,
    MetricsSizes.large,
    MetricsSizes.regular,
    MetricsSizes.small,
    MetricsSizes.tiny,
    bottomSheet,
    insets.bottom,
  ])

  const onRegister = useCallback(() => {
    navigate('RegisterUserScreen', {})
  }, [])

  const onForgotPassword = useCallback(() => {
    navigate('ForgotPassword', {})
  }, [])

  useEffect(() => {
    if (status === QueryStatus.rejected) {
      loading.toogleLoading?.(false)
    }
  }, [loading, status])

  /**
   * TODO reset state login
   */

  return (
    <Container bg={Colors.backgroundPrimary} flex={1} ai="center">
      <Image
        source={Images.topview_login}
        w={MetricsSizes.deviceWidth}
        h={MetricsSizes.deviceHeight / 4.5}
        resizeMode="stretch"
      />
      <LinearGradient
        style={{
          width: MetricsSizes.regular * 4,
          height: MetricsSizes.regular * 4,
          borderRadius: MetricsSizes.regular * 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 4,
          borderColor: Colors.backgroundPrimary,
          marginTop: -MetricsSizes.regular * 2,
        }}
        colors={Colors.backgroundGradientPrimary}
        useAngle
        angle={90}
      >
        <Image
          source={Images.logo1}
          w={MetricsSizes.regular * 3}
          h={MetricsSizes.large * 3}
          resizeMode="contain"
        />
      </LinearGradient>
      <Container h={MetricsSizes.regular} />
      <KeyboardScrollView
        style={{
          flex: 1,
          width: MetricsSizes.deviceWidth,
        }}
      >
        <Container flex={1} ph={MetricsSizes.tiny}>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /([3|5|7|8|9])+([0-9]{8})\b/g,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholderTextColor={Colors.textSecondary}
                placeholder={i18next.t('Login.placeholder.numberPhone')}
                maxLength={9}
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  backgroundColor: Colors.backgroundSecondary,
                }}
              />
            )}
            name="phone"
          />
          <Container h={MetricsSizes.small} />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /([3|5|7|8|9])+([0-9]{8})\b/g,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholderTextColor={Colors.textSecondary}
                placeholder={i18next.t('Login.placeholder.password')}
                maxLength={9}
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  backgroundColor: Colors.backgroundSecondary,
                }}
              />
            )}
            name="password"
          />
          <Container h={MetricsSizes.small} />
          <Container ai="center">
            <Text style={[Fonts.textTiny, { color: Colors.textPrimary }]}>
              Quên mật khẩu?
            </Text>
          </Container>
          <Container h={MetricsSizes.small} />
          <Container flexDr="row" jc="space-between">
            <Touchable onPress={onLogin} flex={7.5 / 10}>
              <LinearGradient
                style={{
                  height: MetricsSizes.large,
                  borderRadius: scale(10),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                colors={Colors.backgroundGradientPrimary}
                useAngle
                angle={90}
              >
                <Text style={[Fonts.textSmallBold, { color: Colors.white }]}>
                  Đăng nhập
                </Text>
              </LinearGradient>
            </Touchable>
            <Touchable onPress={onLoginBiometric} ai="flex-end" flex={2 / 10}>
              <LinearGradient
                style={{
                  width: MetricsSizes.large,
                  height: MetricsSizes.large,
                  borderRadius: scale(10),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                colors={Colors.backgroundGradientPrimary}
                useAngle
                angle={90}
              >
                <Image
                  source={Images.finger}
                  w={MetricsSizes.small * 2}
                  h={MetricsSizes.small * 2}
                  resizeMode="contain"
                />
              </LinearGradient>
            </Touchable>
          </Container>
        </Container>
      </KeyboardScrollView>
      <Container
        bg={Colors.backgroundSecondary}
        w={MetricsSizes.large}
        h={MetricsSizes.large}
        br={MetricsSizes.tiny}
        ai="center"
        jc="center"
        as="center"
        position="absolute"
        bottom={insets.bottom + insets.top}
      >
        <Image
          source={Images.face_id}
          w={MetricsSizes.large - MetricsSizes.small}
          h={MetricsSizes.large - MetricsSizes.small}
          resizeMode="contain"
        />
      </Container>
    </Container>
  )
}

export default LoginContainer

// const styles = StyleSheet.create({})
