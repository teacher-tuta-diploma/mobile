import React, { useCallback, useMemo } from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import BottomTab from '@/Components/BottomTab'
import MyOrder from '@/Containers/MyOrder'
import Home from '@/Containers/Home'
import ProfileUserStack from './ProfileUser'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'
import Notification from '@/Containers/Notification'
import QrScanContainer from '@/Containers/QrScanContainer'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const headerOption = useMemo(() => {
    return {
      header: undefined,
      headerShown: false,
    }
  }, [])

  const { params } = useRoute<RouteProp<RootStackParamList, 'Main'>>()

  const renderTabbar = useCallback((props: BottomTabBarProps) => {
    return <BottomTab {...props} />
  }, [])
  return (
    <Tab.Navigator
      tabBar={renderTabbar}
      initialRouteName={params?.tab ?? 'Home'}
    >
      <Tab.Screen options={headerOption} name="Home" component={Home} />
      <Tab.Screen options={headerOption} name="Order" component={MyOrder} />
      <Tab.Screen
        options={headerOption}
        name="Qrcode"
        component={QrScanContainer}
      />
      <Tab.Screen
        options={headerOption}
        name="Notifications"
        component={Notification}
      />
      <Tab.Screen
        options={headerOption}
        name="Profile"
        component={ProfileUserStack}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
