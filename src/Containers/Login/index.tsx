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
    <View
      style={[Layout.fill, Common.backgroundPrimary, Common.backgroundReset]}
    >
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <KeyboardScrollView>
        <View style={[Gutters.largeVMargin, Layout.alignItemsCenter]}>
          <Text
            style={[Fonts.textLarge, { color: NavigationTheme.colors.primary }]}
          >
            {i18next.t('app.title')}
          </Text>
          <Text
            style={[
              Fonts.textRegular,
              { color: NavigationTheme.colors.primary },
            ]}
          >
            {i18next.t('Login.intro')}
          </Text>
          <Image
            source={Images.icon_truck2}
            w={MetricsSizes.small}
            h={MetricsSizes.small}
            resizeMode="contain"
          />
        </View>

        <View style={[Gutters.smallHMargin]}>
          <View
            style={[
              Common.textInput,
              Layout.rowHCenter,
              { height: MetricsSizes.small * 2.5, paddingLeft: 0 },
            ]}
          >
            <TouchableOpacity
              onPress={showMenu}
              style={[
                Layout.rowCenter,
                Gutters.tinyHMargin,
                Gutters.tinyHPadding,
                { backgroundColor: Colors.grey2 },
              ]}
            >
              <View style={[{ width, height }, Layout.selfCenter]}>
                <Image
                  style={Layout.fullSize}
                  source={Images.flag_vn}
                  resizeMode={'contain'}
                />
              </View>
              <Menu
                visible={visible}
                anchor={
                  <Text style={[Fonts.textSmall, { color: Colors.black }]}>
                    +84
                  </Text>
                }
                onRequestClose={hideMenu}
              >
                {/* <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
              <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
              <MenuItem disabled>Disabled item</MenuItem>
              <MenuDivider />
              <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
              </Menu>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /([3|5|7|8|9])+([0-9]{8})\b/g,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholderTextColor={Colors.placeHolder}
                    placeholder={i18next.t('Login.placeholder.numberPhone')}
                    maxLength={9}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phone"
              />
            </View>
          </View>
          <View style={[Gutters.tinyRMargin]}>
            {errors.phone && errors.phone.type === 'required' && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Login.message.numberPhoneRequire')}
              </Text>
            )}
            {errors.phone && errors.phone.type === 'pattern' && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Login.message.numberPhoneInvalid')}
              </Text>
            )}
          </View>

          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 20,
              minLength: 6,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Container mt={MetricsSizes.tiny}>
                <TextField
                  placeholderTextColor={Colors.placeHolder}
                  placeholder={i18next.t('Login.placeholder.password')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry
                  value={value}
                />
              </Container>
            )}
            name="password"
          />
          {errors.password && errors.password.type === 'required' && (
            <Text style={[Fonts.textTiny, { color: Colors.error }]}>
              {i18next.t('Login.message.passwordRequire')}
            </Text>
          )}

          {errors.password &&
            (errors.password.type === 'minLength' ||
              errors.password.type === 'maxLength') && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Login.message.lengthPassword')}
              </Text>
            )}

          <Touchable
            onPress={onForgotPassword}
            style={[Layout.alignItemsEnd, Gutters.tinyVMargin]}
          >
            <Text style={[Fonts.textRegular, { color: Colors.note }]}>
              {i18next.t('Login.forgetPassword')}
            </Text>
          </Touchable>

          <TouchableOpacity
            onPress={handleSubmit(onLogin)}
            style={[
              Common.button.rounded,
              { backgroundColor: Colors.primary },
              Gutters.tinyTMargin,
            ]}
          >
            <Text style={[Fonts.textRegular]}>{i18next.t('Login.name')}</Text>
          </TouchableOpacity>

          <Container ai="center">
            <Text style={[Fonts.textRegular, { color: Colors.error }]}>
              {data?.error?.message}
            </Text>
            {isError && (
              <Text style={[Fonts.textRegular, { color: Colors.error }]}>
                {error?.data?.error?.message?.toString()}
              </Text>
            )}
          </Container>

          <View style={[Layout.alignItemsCenter, Gutters.regularTMargin]}>
            <Text style={[Fonts.textRegular, { color: Colors.grey }]}>
              {i18next.t('Login.other')}
            </Text>
          </View>

          <Social />
        </View>
      </KeyboardScrollView>

      <View
        style={[
          Layout.alignItemsCenter,
          Layout.rowCenter,
          Layout.absolute,
          Layout.selfCenter,
          {
            bottom: MetricsSizes.tiny,
          },
        ]}
      >
        <Touchable mb={MetricsSizes.small} onPress={onRegister}>
          <Text style={[Fonts.textRegular, { color: Colors.note }]}>
            {i18next.t('Login.create')}
          </Text>
        </Touchable>
      </View>
    </View>
  )
}

export default LoginContainer

// const styles = StyleSheet.create({})
