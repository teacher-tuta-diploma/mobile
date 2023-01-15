import { Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@/Hooks'
import { Touchable } from '../Touchable'

type Props = {
  text: string
  onPress?: () => void
  w?: number | string
  noMargin?: boolean
}

const ButtonGradient = ({ text, onPress, w, noMargin }: Props) => {
  const { MetricsSizes, Fonts, Colors } = useTheme()
  return (
    <LinearGradient
      style={{
        borderRadius: MetricsSizes.tiny,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: noMargin ? 0 : MetricsSizes.tiny,
        marginBottom: noMargin ? 0 : MetricsSizes.small,
      }}
      colors={Colors.backgroundGradientPrimary}
      useAngle
      angle={90}
    >
      <Touchable
        onPress={onPress}
        pv={MetricsSizes.tiny * 1.2}
        w={w ?? '100%'}
        ai="center"
      >
        <Text style={[Fonts.textRegular]}>{text}</Text>
      </Touchable>
    </LinearGradient>
  )
}

export default ButtonGradient
