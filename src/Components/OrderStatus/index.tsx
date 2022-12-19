import { Text } from 'react-native'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import React from 'react'
import { Touchable } from '@/Components/Touchable'

type Props = {
  iconLeft?: number
  title: string
  iconRight?: number
  onPressRight?: () => void
  bg?: string
}
const OrderStatus = ({
  iconLeft,
  iconRight,
  title,
  onPressRight,
  bg,
}: Props) => {
  const { Colors, MetricsSizes, Fonts, FontFamily } = useTheme()
  return (
    <Container
      flexDr="row"
      ai="center"
      jc="space-between"
      ph={MetricsSizes.tiny}
      pv={MetricsSizes.tiny / 4}
      bg={bg ?? Colors.bgOrange}
    >
      <Container flexDr="row" ai="center">
        {iconLeft && (
          <Image
            source={iconLeft}
            w={MetricsSizes.regular * 1.2}
            h={MetricsSizes.regular * 1.2}
            bg={bg ?? Colors.bgOrange}
          />
        )}
        <Container w={MetricsSizes.tiny} />
        <Text style={[Fonts.textSmall, { fontFamily: FontFamily.NunitoBold }]}>
          {title}
        </Text>
      </Container>
      {iconRight && (
        <Touchable onPress={onPressRight}>
          <Image
            source={iconRight}
            w={MetricsSizes.tiny * 1.5}
            h={MetricsSizes.tiny * 1.5}
            tintColor={Colors.white}
            bg={Colors.bgOrange}
          />
        </Touchable>
      )}
    </Container>
  )
}

export default OrderStatus
