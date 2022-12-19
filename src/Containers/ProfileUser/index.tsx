import { StyleSheet, Text } from 'react-native'
import React, { useCallback, useEffect, useMemo } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import { SafeAreaView } from 'react-native-safe-area-context'
import GroupBreadCrumb from '@/Components/GroupBreadCrumb'
import { Touchable } from '@/Components/Touchable'
import { useDispatch } from 'react-redux'
import { reset } from '@/Store/Authentication'
import { confirm } from '@/Config/alert.helper'
import { navigate } from '@/Navigators/utils'
import {
  useHandleGetDocumentQuery,
  useLazyHandleGetInfoQuery,
  useHandleDisableUserMutation,
} from '@/Services/modules/users'
import { useAppSelector } from '@/Hooks/useApp'
import { useNavigation } from '@react-navigation/native'
import { useAppAuth } from '../ChatSendBird/Uikit/libs/authentication'
import { useConnection } from '../ChatSendBird/Uikit'
import useCall from '@/Hooks/useCall'

const ProfileUser = () => {
  const { Gutters, Fonts, Common, Images, Colors, MetricsSizes, FontFamily } =
    useTheme()
  const { signOut } = useAppAuth()
  const { disconnect } = useConnection()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const callHook = useCall()
  const [handleGetInfo, propsGetInfo] = useLazyHandleGetInfoQuery({})
  const accessToken = useAppSelector(state => state.authentication.accessToken)

  const propsGetDocument = useHandleGetDocumentQuery(
    {
      authToken: accessToken,
    },
    {
      skip: !accessToken,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  )

  const [HandleDisableUser] = useHandleDisableUserMutation({})

  const avatar = useMemo(
    () => propsGetDocument?.data?.data?.[0]?.document?.url ?? '',
    [propsGetDocument?.data?.data],
  )

  useEffect(() => {
    handleGetInfo()
  }, [handleGetInfo])

  const onReset = useCallback(async () => {
    dispatch(reset())
    await signOut()
    await disconnect()
    callHook.deauthenticate?.()
    callHook.unregisterToken?.()
  }, [callHook, disconnect, dispatch, signOut])
  /**
   * xóa tài khoản và đăng xuất
   */
  const onDisableUser = useCallback(() => {
    confirm('Cảnh báo', 'Tài khoản của bạn sẽ bị xóa', () => {
      HandleDisableUser({
        async callback() {
          onReset()
        },
      })
    })
  }, [HandleDisableUser, onReset])

  const onLogout = useCallback(async () => {
    confirm('Thông báo', 'Bạn có muốn đăng xuất', async () => {
      onReset()
    })
  }, [onReset])

  useEffect(() => {
    navigation.addListener('focus', () => {
      propsGetDocument.refetch()
    })
  }, [navigation, propsGetDocument])

  return (
    <Container flex={1} bg={Colors.white}>
      <Container bg={Colors.primary}>
        <SafeAreaView edges={['right', 'top', 'left']}>
          <Container
            ph={MetricsSizes.tiny}
            mt={MetricsSizes.tiny}
            pv={MetricsSizes.small}
            flexDr="row"
            ai="center"
          >
            <Container ph={MetricsSizes.tiny * 1.5}>
              <Image
                source={avatar ? { uri: avatar } : Images.user_light}
                w={MetricsSizes.large}
                h={MetricsSizes.large}
                resizeMode="cover"
                br={MetricsSizes.large / 2}
              />
            </Container>
            <Container ml={MetricsSizes.tiny}>
              <Text
                style={[
                  Fonts.textMedium,
                  { fontFamily: FontFamily.NunitoBold },
                ]}
              >
                {propsGetInfo.data?.name}
              </Text>
              <Text style={[Fonts.textSmall]}>
                {propsGetInfo.data?.phone?.replace('+84', '0')}
              </Text>
            </Container>
          </Container>
        </SafeAreaView>
      </Container>
      <GroupBreadCrumb
        funcs={[
          {
            icon: Images.update_info,
            name: 'Cập nhật thông tin',
            onPress: () => {
              navigate('EditProfileScreen', {})
            },
          },
          {
            icon: Images.change_password,
            name: 'Đổi mật khẩu',
            onPress: () => {
              navigate('ChangePassword', {})
            },
          },
        ]}
      />
      <GroupBreadCrumb
        funcs={[
          {
            icon: Images.setting,
            name: 'Cài đặt chung',
            onPress: () => {
              navigate('SettingScreen', {})
            },
          },
        ]}
      />
      <GroupBreadCrumb
        funcs={[
          {
            icon: Images.help_center,
            name: 'Trung tâm trợ giúp',
            onPress() {
              navigate('HelpCenter', {})
            },
          },
          {
            icon: Images.message,
            name: 'Tổng đài tư vấn',
          },
        ]}
      />
      <Container style={styles.button}>
        <Touchable
          onPress={onDisableUser}
          mh={MetricsSizes.tiny}
          style={[
            Common.button.rounded,
            { backgroundColor: Colors.primary, height: MetricsSizes.small * 2 },
            Gutters.tinyTMargin,
          ]}
        >
          <Text style={[Fonts.textRegular]}>Xóa tài khoản</Text>
        </Touchable>
        <Touchable
          onPress={onLogout}
          mh={MetricsSizes.tiny}
          style={[
            Common.button.rounded,
            { backgroundColor: Colors.primary, height: MetricsSizes.small * 2 },
            Gutters.tinyTMargin,
          ]}
        >
          <Text style={[Fonts.textRegular]}>Đăng xuất</Text>
        </Touchable>
      </Container>
    </Container>
  )
}

export default ProfileUser

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
})
