import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'

export const useStyleOTP = () => {
  const { Colors, Common, Fonts, Gutters } = useTheme()

  return useMemo(() => {
    const styles = StyleSheet.create({
      titleTimeEnd: {
        color: Colors.bgRed,
      },
      digitStyle: {
        backgroundColor: Colors.white,
      },
      timeLabelStyle: {
        ...Common.backgroundPrimary,
        ...Fonts.textSmall,
      },
      titleEnded: {
        ...Fonts.textSmall,
        ...Gutters.tinyRMargin,
        color: Colors.primary,
      },
      resendText: {
        ...Fonts.textSmall,
        color: Colors.success,
      },
      changeTelText: {
        ...Gutters.smallLMargin,
      },
    })

    return styles
  }, [
    Colors.bgRed,
    Colors.primary,
    Colors.success,
    Colors.white,
    Common.backgroundPrimary,
    Fonts.textSmall,
    Gutters.smallLMargin,
    Gutters.tinyRMargin,
  ])
}
