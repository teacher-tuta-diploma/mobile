import React, { useCallback, useMemo } from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import BottomTab from '@/Components/BottomTab'
import MyOrder from '@/Containers/Activity'
import Home from '@/Containers/Home'
import ProfileUserStack from './ProfileUser'
import { RootStackParamList } from '@/Navigators/utils'
import Notification from '@/Containers/Notification'
import QrScanContainer from '@/Containers/QrScanContainer'
import ProfileScreen from '@/Containers/ProfileScreen'
import SettingScreen from '@/Containers/SettingScreen'

const Tab = createBottomTabNavigator<RootStackParamList>()

// @refresh reset
const MainNavigator = () => {
  const headerOption = useMemo(() => {
    return {
      header: undefined,
      headerShown: false,
    }
  }, [])

  const renderTabbar = useCallback((props: BottomTabBarProps) => {
    return <BottomTab {...props} />
  }, [])
  return (
    <Tab.Navigator tabBar={renderTabbar}>
      <Tab.Screen options={headerOption} name="Home" component={Home} />
      <Tab.Screen options={headerOption} name="Activity" component={MyOrder} />
      <Tab.Screen
        options={headerOption}
        name="Qrcode"
        component={QrScanContainer}
      />
      <Tab.Screen
        options={headerOption}
        name="Identifier"
        component={ProfileScreen}
      />
      <Tab.Screen
        options={headerOption}
        name="SettingScreen"
        component={SettingScreen}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
