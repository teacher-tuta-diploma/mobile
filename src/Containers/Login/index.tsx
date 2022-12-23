import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/Hooks'
import { Menu } from 'react-native-material-menu'
import Image from '@/Components/Image'

import { useHandleLoginMutation } from '@/Services/modules/users'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import Container from '@/Components/Container'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/Components/TextInput'
import Social from './components/Social'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import KeyboardScrollView from '@/Components/KeyboardScrollView'
import { Touchable } from '@/Components/Touchable'
import { navigate } from '@/Navigators/utils'
import { scale } from 'react-native-utils-scale'
import i18next from 'i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const LoginContainer = () => {
  const {
    Layout,
    Gutters,
    Common,
    Fonts,
    NavigationTheme,
    Images,
    Colors,
    MetricsSizes,
  } = useTheme()
  const insets = useSafeAreaInsets()
  const { width, height } = { height: scale(40), width: scale(40) }
  const [visible, setVisible] = useState(false)
  const [handleLogin, { data, error, isError, status, reset }] =
    useHandleLoginMutation({
      fixedCacheKey: 'Login',
    })
  console.log(
    '🛠 LOG: 🚀 --> ------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  console.log(
    '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 39 ~ LoginContainer ~ data',
    data,
    error,
    isError,
  )
  console.log(
    '🛠 LOG: 🚀 --> ------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )

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
      loading.toogleLoading?.(true)
      handleLogin({
        phone:
          data.phone[0] === '0'
            ? `+84${data.phone.slice(1, data.phone.length)}`
            : `+84${data.phone}`,
        password: data.password,
        callback() {
          loading.toogleLoading?.(false)
        },
      })
    },
    [handleLogin, loading],
  )

  const onRegister = useCallback(() => {
    navigate('RegisterUserScreen', {})
  }, [])

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)

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
  useEffect(() => {
    return () => {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container pt={insets.top} flex={1} ai="center">
      <Image
        source={Images.logo1}
        w={scale(70)}
        h={scale(70)}
        resizeMode="contain"
      />

      <Container ph={MetricsSizes.tiny}>
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
      </Container>
    </Container>
  )
}

export default LoginContainer

// const styles = StyleSheet.create({})
