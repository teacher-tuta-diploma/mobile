import { ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Header from '@/Components/Header'
import SettingItem from './components/SettingItem'
import { navigate } from '@/Navigators/utils'
import useBottomSheet from '@/Hooks/useBottomSheet'
import Logout from './components/Logout'

const SettingScreen = () => {
  const { Colors, MetricsSizes, Images, Icons } = useTheme()
  const bottomSheet = useBottomSheet()
  const navigateChangePassword = useCallback(
    () => navigate('ChangePassword', {}),
    [],
  )
  const navigateEnterPassword = useCallback(
    () => navigate('EnterPassword', {}),
    [],
  )
  const navigateSettingFinger = useCallback(
    () => navigate('SettingFingerprint', {}),
    [],
  )
  const navigateSettingFaceId = useCallback(
    () => navigate('SettingFaceId', {}),
    [],
  )
  const navigateKMAathInTro = useCallback(
    () => navigate('KMAathIntroScreen', {}),
    [],
  )
  const logout = useCallback(() => {
    bottomSheet?.onShowBottomSheet?.(<Logout />)
  }, [bottomSheet])
  return (
    <Container flex={1} bg={Colors.black} ph={MetricsSizes.small}>
      <Header title="Cấu hình" noBack textLarge />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <SettingItem
          icon={Icons.key}
          name="Thiết lập khóa"
          onPress={navigateEnterPassword}
        />
        <SettingItem
          icon={Icons.key2}
          name="Đổi mật khẩu"
          onPress={navigateChangePassword}
        />
        <SettingItem
          icon={Icons.finger2}
          name="Sử dụng vân tay"
          onPress={navigateSettingFinger}
        />
        <SettingItem
          icon={Images.face_id}
          name="Face ID"
          onPress={navigateSettingFaceId}
        />
        <SettingItem
          icon={Icons.i_circle}
          name="Về KMAath"
          onPress={navigateKMAathInTro}
        />
        <SettingItem
          icon={Icons.logout1}
          name="Đăng xuất"
          noRightIcon
          isLogout
          onPress={logout}
        />
      </ScrollView>
    </Container>
  )
}

export default SettingScreen
