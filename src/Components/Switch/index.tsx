import Container from '../Container'
import { Touchable } from '../Touchable'
import { useTheme } from '@/Hooks'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type Props = {
  value?: boolean
  onValueChange?: () => void
}

const Switch = ({ value, onValueChange }: Props) => {
  const { MetricsSizes, Colors } = useTheme()
  /**
   * chiều cao của switch
   */
  const HEIGHT = useMemo(
    () => MetricsSizes.regular * 0.6,
    [MetricsSizes.regular],
  )
  /**
   * chiều rộng của switch
   */
  const WIDTH = useMemo(() => HEIGHT * 2, [HEIGHT])
  const [valueShow, setValueShow] = useState<boolean>(false)
  const onToggle = useCallback(() => {
    onValueChange?.()
  }, [onValueChange])

  useEffect(() => {
    setValueShow(!!value)
  }, [value])

  return (
    <Touchable
      br={MetricsSizes.small}
      bg={valueShow ? Colors.borderGreen2 : Colors.grey10}
      h={HEIGHT + MetricsSizes.tiny * 0.8}
      w={WIDTH + MetricsSizes.tiny * 0.8}
      pv={MetricsSizes.tiny * 0.4}
      ph={MetricsSizes.tiny * 0.4}
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
  )
}

export default Switch
