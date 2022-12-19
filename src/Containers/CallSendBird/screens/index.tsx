import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DirectCallSignInScreen from './DirectCallSignInScreen'
import { DirectRoutes } from '../navigations/routes'
import DirectCallHomeTab from './DirectCallHomeTab'
import DirectCallVideoCallingScreen from './DirectCallVideoCallingScreen'
import DirectCallVoiceCallingScreen from './DirectCallVoiceCallingScreen'
import { useAuthContext } from '../contexts/AuthContext'
import { CALL_PERMISSIONS, usePermissions } from '../hooks/usePermissions'

export const Stack = createStackNavigator()

export const CallNavigation = () => {
  usePermissions(CALL_PERMISSIONS)

  const { currentUser } = useAuthContext()
  console.log(
    '🛠 LOG: 🚀 --> -------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  console.log(
    '🛠 LOG: 🚀 --> ~ file: index.tsx:17 ~ CallNavigation ~ currentUser',
    currentUser,
  )
  console.log(
    '🛠 LOG: 🚀 --> -------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  return (
    <Stack.Navigator>
      {!currentUser ? (
        <Stack.Screen
          name={DirectRoutes.SIGN_IN}
          component={DirectCallSignInScreen}
          options={{ headerTitleAlign: 'center', headerTitle: 'Sign in' }}
        />
      ) : (
        <>
          <Stack.Screen
            name={DirectRoutes.HOME_TAB}
            component={DirectCallHomeTab}
            options={{ headerShown: false }}
          />
          <Stack.Group
            screenOptions={{ headerShown: false, gestureEnabled: false }}
          >
            <Stack.Screen
              name={DirectRoutes.VIDEO_CALLING}
              component={DirectCallVideoCallingScreen}
            />
            <Stack.Screen
              name={DirectRoutes.VOICE_CALLING}
              component={DirectCallVoiceCallingScreen}
              options={{
                cardStyle: {},
                presentation: 'modal',
                gestureEnabled: false,
              }}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  )
}
