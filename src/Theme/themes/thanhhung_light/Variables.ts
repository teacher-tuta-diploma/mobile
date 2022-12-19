import { scale } from 'react-native-utils-scale'

const Colors = {
  primary: '#D32F2F',
  white: '#ffffff',
  black: '#000000',
  text: '#ffffff',
  borderInput: '#A9A9A9',
  disableButton: '#EFEFEF',
}

const NavigationColors = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize = {
  tiny: scale(14),
  small: scale(16),
  regular: scale(18),
  medium: scale(20),
  large: scale(22),
}

/**
 * Metrics Sizes
 */
const tiny = scale(10) // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  MetricsSizes,
  FontSize,
}
