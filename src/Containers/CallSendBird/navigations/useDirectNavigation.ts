import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { AsParamListBase } from '../types/navigations'
import type { DirectRouteWithParams, DirectRoutes } from './routes'

export type DirectParamListBase = AsParamListBase<DirectRouteWithParams>
export type DirectRouteProp<T extends DirectRoutes> = RouteProp<
  DirectParamListBase,
  T
>
export type DirectNativeStackNavigationProp<T extends DirectRoutes> =
  StackNavigationProp<DirectParamListBase, T>

export const useDirectNavigation = <T extends DirectRoutes>() => {
  const navigation = useNavigation<DirectNativeStackNavigationProp<T>>()
  const route = useRoute<DirectRouteProp<T>>()

  return { navigation, route }
}
