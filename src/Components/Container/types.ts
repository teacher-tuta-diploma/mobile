import { ReactNode } from 'react'
import { StyleProp, ViewProps, ViewStyle } from 'react-native'

export type ContainerProps = ViewProps & {
  children?: ReactNode
  containerStyle?: StyleProp<ViewStyle>
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
  as?: ViewStyle['alignSelf']
  flex?: ViewStyle['flex']
  flexDr?: ViewStyle['flexDirection']
  bg?: ViewStyle['backgroundColor']
  br?: ViewStyle['borderRadius']
  bw?: ViewStyle['borderWidth']
  bc?: ViewStyle['borderColor']
  overflow?: ViewStyle['overflow']
  position?: ViewStyle['position']
  top?: ViewStyle['top']
  right?: ViewStyle['right']
  left?: ViewStyle['left']
  bottom?: ViewStyle['bottom']
}
