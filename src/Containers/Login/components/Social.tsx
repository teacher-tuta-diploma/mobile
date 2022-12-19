import { Platform, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import { LoginManager, LoginResult, Profile } from 'react-native-fbsdk-next'
import { RootStackParamList } from '@/Navigators/utils'
import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin'
import { useHandleLoginSocialMutation } from '@/Services/modules/users'
import { api, STATUS_API } from '@/Services/api'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { alertMessage } from '@/Config/alert.helper'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { useDispatch } from 'react-redux'

const Social = () => {
  const { width, height } = { height: 30, width: 30 }

  const { Layout, Gutters, Images } = useTheme()
  const [handleLoginSocial, propsLoginSocial] = useHandleLoginSocialMutation({
    fixedCacheKey: 'LoginSocial',
  })

  const [userGoogle, setUserGoogle] = useState<User | Profile>()
  const loading = useLoadingGlobal()
  const provider = useRef<'google' | 'facebook'>('google')
  const token = useRef<string>('')
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const dispatch = useDispatch()

  useEffect(() => {
    GoogleSignin.configure()
  }, [])

  useEffect(() => {
    if (propsLoginSocial.status === QueryStatus.rejected) {
      loading.toogleLoading?.(false)
    }
  }, [loading, propsLoginSocial.status])

  /**
   * TODO Check nếu user không tồn tại thì đi sang màn đăng ký mới
   * * reset lại state login
   */
  useEffect(() => {
    if (propsLoginSocial?.error?.status === STATUS_API.NOT_FOUND) {
      navigation.navigate('RegisterSocialScreen', {
        user: userGoogle,
        key: provider.current,
        token: token.current,
      })
      dispatch(api.util.resetApiState())
    }
  }, [dispatch, navigation, propsLoginSocial?.error?.status, userGoogle])

  /**
   * TODO Check nếu user đã tồn tại nhưng chưa active thì sang màn OTP
   */
  useEffect(() => {
    if (propsLoginSocial?.error?.status === STATUS_API.CONFLICT) {
      navigation.navigate('OtpScreen', {
        phone: propsLoginSocial.error?.data?.error.data?.account.phone,
        id: propsLoginSocial.error?.data?.error.data?.account.id,
        credentialId: propsLoginSocial.error?.data?.error.data?.credentail.id,
      })
    }
  }, [
    navigation,
    propsLoginSocial.error?.data?.error.data?.account.id,
    propsLoginSocial.error?.data?.error.data?.account.phone,
    propsLoginSocial.error?.data?.error.data?.credentail.id,
    propsLoginSocial.error?.status,
  ])

  useEffect(() => {
    if (propsLoginSocial.error?.data?.error) {
      alertMessage('Lỗi', propsLoginSocial.error.data?.error.message)
    }
  }, [propsLoginSocial.error?.data?.error])

  useEffect(() => {
    return () => {
      propsLoginSocial.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLoginFB = useCallback(() => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only')
    }
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async (result: LoginResult) => {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log(
            'Login success with permissions: ' +
              result?.grantedPermissions?.toString(),
          )

          const userInfo = await Profile.getCurrentProfile()
          userInfo && setUserGoogle(userInfo)
          provider.current = 'facebook'
          token.current = userInfo?.userID ?? ''
          loading.toogleLoading?.(true)
          handleLoginSocial({
            key: token.current,
            provider: provider.current,
            callback() {
              loading.toogleLoading?.(false)
            },
          })
        }
      },
      error => {
        console.log('Login fail with error: ' + error)
      },
    )
  }, [handleLoginSocial, loading])

  const onLoginGG = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setUserGoogle(userInfo)
      token.current = userInfo.user.id ?? ''
      loading.toogleLoading?.(true)
      handleLoginSocial({
        key: token.current,
        provider: provider.current,
        callback() {
          loading.toogleLoading?.(false)
        },
      })
      //   navigate('RegisterSocialScreen', {})
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    // navigate('RegisterSocialScreen', {})
  }, [handleLoginSocial, loading])

  return (
    <View
      style={[Layout.alignItemsCenter, Layout.rowCenter, Gutters.tinyTMargin]}
    >
      <TouchableOpacity
        onPress={onLoginFB}
        style={[{ width, height }, Layout.selfCenter]}
      >
        <Image
          style={Layout.fullSize}
          source={Images.facebook}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onLoginGG}
        style={[{ width, height }, Layout.selfCenter, Gutters.tinyHMargin]}
      >
        <Image
          style={Layout.fullSize}
          source={Images.google}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Social
