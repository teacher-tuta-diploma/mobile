import Container from '../Container'
import { Touchable } from '../Touchable'
import { useTheme } from '@/Hooks'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Color from 'color'

type Props = {
  value?: boolean
  onValueChange?: () => void
}

const Switch = ({ value, onValueChange }: Props) => {
  const { MetricsSizes, Colors } = useTheme()
  /**
   * chiều cao của switch
   */
  const HEIGHT = useMemo(() => MetricsSizes.small * 0.8, [MetricsSizes.small])
  /**
   * chiều rộng của switch
   */
  const WIDTH = useMemo(() => HEIGHT * 2.2, [HEIGHT])
  const [valueShow, setValueShow] = useState<boolean>(false)
  const onToggle = useCallback(() => {
    onValueChange?.()
  }, [onValueChange])

  useEffect(() => {
    setValueShow(!!value)
  }, [value])

  return (
    <LinearGradient
      style={{
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.backgroundPrimary,
      }}
      colors={
        valueShow
          ? Colors.backgroundGradientPrimary
          : [
              Color(Colors.textSecondary, 'hex').alpha(1).toString(),
              Color(Colors.textSecondary, 'hex').alpha(1).toString(),
            ]
      }
      useAngle
      angle={90}
    >
      <Touchable
        br={MetricsSizes.small}
        h={HEIGHT + MetricsSizes.tiny * 0.6}
        w={WIDTH + MetricsSizes.tiny * 0.6}
        pv={MetricsSizes.tiny * 0.3}
        ph={MetricsSizes.tiny * 0.3}
        onPress={onToggle}
      >
        <Container
          bg={Colors.white}
          br={100}
          h={HEIGHT}
          w={HEIGHT}
          ml={valueShow ? WIDTH - HEIGHT : 0}
        />
      </Touchable>
    </LinearGradient>
  )
}

export default Switch
