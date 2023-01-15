/* eslint-disable no-sparse-arrays */
import React, { useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigateAndReset, navigationRef, RootStackParamList } from './utils'
import StartContainer from '@/Containers/StartContainer'
import LoginContainer from '@/Containers/Login'
import RegisterSocialContainer from '@/Containers/RegisterSocial'
import RegisterUserContainer from '@/Containers/RegisterUser'
import EditProfile from '@/Containers/EditProfile'
import { useAppSelector } from '@/Hooks/useApp'
import OtpScreen from '@/Containers/OtpScreen'
import RegisterSuccess from '@/Containers/RegisterSuccess'
import ForgotPassword from '@/Containers/ForgotPassword'
import OtpScreenForgotPassword from '@/Containers/OtpScreenForgotPassword'
import SetupPassword from '@/Containers/SetupPassword'
import ProfileDetailScreen from '@/Containers/ProfileDetailScreen'
import ChangePassword from '@/Containers/ChangePassword'
import ConfirmChangePassword from '@/Containers/ConfirmChangePassword'
import EnterPassword from '@/Containers/EnterPassword'
import SettingFingerprint from '@/Containers/SettingFingerprint'
import SettingFaceId from '@/Containers/SettingFaceId'

export const Stack = createStackNavigator<RootStackParamList>()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme, Colors } = useTheme()
  const { colors } = NavigationTheme
  const { accessToken } = useAppSelector(state => state.authentication)
  const { isStart } = useAppSelector(state => state.global)

  useEffect(() => {
    if (!accessToken) {
      navigateAndReset([{ name: 'StartScreen' }])
    }
  }, [accessToken])

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.backgroundPrimary }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={'light-content'} backgroundColor={Colors.black} />
        <>
          {isStart ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="StartScreen" component={StartContainer} />
            </Stack.Navigator>
          ) : !accessToken ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="LoginScreen" component={LoginContainer} />
              <Stack.Screen name="EditProfileScreen" component={EditProfile} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen
                name="RegisterSuccess"
                component={RegisterSuccess}
              />
              <Stack.Screen
                name="RegisterSocialScreen"
                component={RegisterSocialContainer}
              />
              <Stack.Screen
                name="RegisterUserScreen"
                component={RegisterUserContainer}
              />
              <Stack.Screen
                name="OtpScreenForgotPassword"
                component={OtpScreenForgotPassword}
              />
              <Stack.Screen name="SetupPassword" component={SetupPassword} />
              <Stack.Screen
                name="Main"
                component={MainNavigator}
                options={{
                  animationEnabled: false,
                }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Main"
                component={MainNavigator}
                options={{
                  animationEnabled: false,
                  cardStyle: {
                    backgroundColor: Colors.backgroundPrimary,
                  },
                }}
              />
              <Stack.Screen
                name="ProfileDetailScreen"
                component={ProfileDetailScreen}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="ConfirmChangePassword"
                component={ConfirmChangePassword}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="EnterPassword"
                component={EnterPassword}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="SettingFingerprint"
                component={SettingFingerprint}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="SettingFaceId"
                component={SettingFaceId}
                options={{
                  animationEnabled: false,
                }}
              />
            </Stack.Navigator>
          )}
        </>
      </NavigationContainer>
    </View>
  )
}

export default ApplicationNavigator
