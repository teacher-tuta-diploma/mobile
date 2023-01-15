import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native'
import { ContainerProps } from '../Container/types'

export type TextFiledProps = ContainerProps &
  TextInputProps & {
    style?: StyleProp<ViewStyle>
    inputStyle?: StyleProp<TextStyle>
    label?: string
    labelStyle?: StyleProp<TextStyle>
    labelContentStyle?: ViewStyle
    renderLeftAccessory?: () => JSX.Element
    renderRightAccessory?: () => JSX.Element
    prefix?: string
    suffix?: string
    error?: string
    prefixStyle?: StyleProp<TextStyle>
    useFocus?: boolean
    hasError?: boolean
    required?: boolean
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
    noRight?: boolean
  }
