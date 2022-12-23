/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { Dimensions } from 'react-native'
import { scale } from 'react-native-utils-scale'

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  backgroundPrimary: '#101213',
  backgroundSecondary: '#1C1D21',
  textPrimary: '#F1302B',
  textSecondary: '#919392',
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  black: '#000000',
  text: '#212529',
  primary: '#F1302B',
  success: '#28a745',
  error: '#dc3545',
  borderInput: '#A9A9A9',
  placeHolder: '#585858',
  note: '#116476',
  grey: '#9D9999',
  grey2: '#EAEAEA',
  grey3: '#434343',
  grey4: '#D9D9D9',
  grey5: '#F0F0F0',
  grey6: '#F2F2F2',
  grey7: '#646363',
  grey8: '#F6F6F6',
  grey9: '#DEDEDE',
  grey10: '#B6B4B4',
  gray11: '#FAFAFA',
  green1: '#0A5C53',
  green2: '#28B737',
  disableButton: '#EFEFEF',
  bottomTab: '#F8EFEF',
  blue: '#59AFFF',
  borderGreen: '#116476',
  borderRed: '#D32F2F',
  bgRed: '#FF6659',
  bgInfo: '#EEF3F4',
  bgOrange: '#F99233',
  bgBlue: '#F2F8FD',
  bgBlue2: '#80B2CE',
  borderGreen2: '#63DB6F',
  blurBg: 'rgba(73, 73, 73, 0.33)',
  bgNew: 'rgba(33, 33, 33, 0.5)',
  bgInactive: '#ECD5D5',
}

export const NavigationColors = {
  primary: Colors.primary,
  white: Colors.white,
}

/**
 * Font Family
 */
export const FontFamily = {
  NunitoRegular: 'Nunito-Regular',
  NunitoBold: 'Nunito-Bold',
  NunitoItalic: 'Nunito-Italic',
}
/**
 * FontSize
 */
export const FontSize = {
  tiny: scale(14),
  small: scale(16),
  regular: scale(20),
  medium: scale(30),
  large: scale(40),
}

/**
 * Metrics Sizes
 */
const tiny = scale(5) // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
  deviceWidth,
  deviceHeight,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
  FontFamily,
}
