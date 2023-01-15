import { ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Header from '@/Components/Header'
import SettingItem from './components/SettingItem'
import { navigate } from '@/Navigators/utils'

const SettingScreen = () => {
  const { Colors, MetricsSizes, Images, Icons } = useTheme()
  const navigateChangePassword = useCallback(
    () => navigate('ChangePassword', {}),
    [],
  )
  const navigateEnterPassword = useCallback(
    () => navigate('EnterPassword', {}),
    [],
  )
  const navigateSettingFaceId = useCallback(
    () => navigate('SettingFaceId', {}),
    [],
  )
  return (
    <Container flex={1} bg={Colors.black} ph={MetricsSizes.small}>
      <Header title="Cấu hình" noBack textLarge />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <SettingItem icon={Icons.key} name="Thiết lập khóa" />
        <SettingItem
          icon={Icons.key2}
          name="Đổi mật khẩu"
          onPress={navigateChangePassword}
        />
        <SettingItem
          icon={Icons.finger2}
          name="Sử dụng vân tay"
          onPress={navigateEnterPassword}
        />
        <SettingItem
          icon={Images.face_id}
          name="Face ID"
          onPress={navigateSettingFaceId}
        />
        <SettingItem icon={Icons.i_circle} name="Về KMAath" />
        <SettingItem
          icon={Icons.logout1}
          name="Đăng xuất"
          noRightIcon
          isLogout
        />
      </ScrollView>
    </Container>
  )
}

export default SettingScreen
