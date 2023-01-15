import { Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@/Hooks'
import { Touchable } from '../Touchable'

type Props = {
  text: string
  onPress?: () => void
}

const ButtonGradient = ({ text, onPress }: Props) => {
  const { MetricsSizes, Fonts, Colors } = useTheme()
  return (
    <LinearGradient
      style={{
        borderRadius: MetricsSizes.tiny,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: Colors.backgroundPrimary,
      }}
      colors={Colors.backgroundGradientPrimary}
      useAngle
      angle={90}
    >
      <Touchable
        onPress={onPress}
        pv={MetricsSizes.tiny * 1.3}
        w="100%"
        ai="center"
      >
        <Text style={[Fonts.textRegular]}>{text}</Text>
      </Touchable>
    </LinearGradient>
  )
}

export default ButtonGradient
