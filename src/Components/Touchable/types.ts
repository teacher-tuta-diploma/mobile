import { ReactNode } from 'react'
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native'

export type TouchableProps = TouchableOpacityProps & {
  children?: ReactNode
  underlayColor?: string
  style?: StyleProp<ViewStyle>
  handleSubmit?: () => void
  hitSlopRange?: number
  w?: ViewStyle['width']
  h?: ViewStyle['height']
  ml?: ViewStyle['marginLeft']
  mr?: ViewStyle['marginRight']
  mt?: ViewStyle['marginTop']
  mb?: ViewStyle['marginBottom']
  mv?: ViewStyle['marginVertical']
  mh?: ViewStyle['marginHorizontal']
  pl?: ViewStyle['paddingLeft']
  pr?: ViewStyle['paddingRight']
  pt?: ViewStyle['paddingTop']
  pb?: ViewStyle['paddingBottom']
  pv?: ViewStyle['paddingVertical']
  ph?: ViewStyle['paddingHorizontal']
  jc?: ViewStyle['justifyContent']
  ai?: ViewStyle['alignItems']
  flex?: ViewStyle['flex']
  flexDr?: ViewStyle['flexDirection']
  bg?: ViewStyle['backgroundColor']
  br?: ViewStyle['borderRadius']
  as?: ViewStyle['alignSelf']
  bw?: ViewStyle['borderWidth']
  bc?: ViewStyle['borderColor']
}
