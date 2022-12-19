/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { ThemeVariables } from './theme'

export default function ({ FontSize, Colors, FontFamily }: ThemeVariables) {
  return StyleSheet.create({
    textTiny: {
      fontSize: FontSize.tiny,
      color: Colors.text,
      fontFamily: FontFamily.NunitoRegular,
    },
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
      fontFamily: FontFamily.NunitoRegular,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
      fontFamily: FontFamily.NunitoRegular,
    },
    textMedium: {
      fontSize: FontSize.medium,
      color: Colors.text,
      fontFamily: FontFamily.NunitoRegular,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
      fontFamily: FontFamily.NunitoRegular,
    },
    textTinyBold: {
      fontSize: FontSize.tiny,
      color: Colors.grey3,
      fontFamily: FontFamily.NunitoBold,
    },
    textSmallBold: {
      fontSize: FontSize.small,
      color: Colors.grey3,
      fontFamily: FontFamily.NunitoBold,
    },
    textRegularBold: {
      fontSize: FontSize.regular,
      color: Colors.grey3,
      fontFamily: FontFamily.NunitoBold,
    },
    textMediumBold: {
      fontSize: FontSize.medium,
      color: Colors.grey3,
      fontFamily: FontFamily.NunitoBold,
    },
    textLargeBold: {
      fontSize: FontSize.large,
      color: Colors.grey3,
      fontFamily: FontFamily.NunitoBold,
    },
    titleSmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}
