import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileUser from '@/Containers/ProfileUser'
import { RootStackParamList } from './utils'
import EditProfile from '@/Containers/EditProfile'
import ChangePassword from '@/Containers/ChangePassword'

const Stack = createStackNavigator<RootStackParamList>()

const ProfileUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileUser" component={ProfileUser} />
      <Stack.Screen name="EditProfileScreen" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  )
}

export default ProfileUserStack
