import { Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { SelectedCarT } from '@/Store/Delivery/type'

type Props = SelectedCarT
const TransportInfo = (props?: Partial<Props>) => {
  const { Colors, Fonts, MetricsSizes, Images, FontFamily } = useTheme()

  return (
    <Container flex={1} pv={MetricsSizes.tiny} flexDr="row">
      <Container w={MetricsSizes.large} jc="center" ai="center">
        <Image
          source={Images.icon_truck2}
          w={MetricsSizes.regular}
          h={MetricsSizes.regular}
          resizeMode="contain"
        />
      </Container>

      <Container mr={MetricsSizes.small} flex={1}>
        <Text
          style={[
            Fonts.textSmall,
            { color: Colors.grey3, fontFamily: FontFamily.NunitoBold },
          ]}
        >
          {props?.title}
        </Text>
        <Text
          style={[
            Fonts.textTiny,
            { color: Colors.grey3, marginVertical: MetricsSizes.tiny / 4 },
          ]}
        >
          {props?.description}
        </Text>
        <Text style={[Fonts.textTiny, { color: Colors.grey3 }]}>
          {props?.length}x{props?.width}x{props?.height} Mét . Lên đến{' '}
          {props?.maxWeight} kg
        </Text>
      </Container>
    </Container>
  )
}

export default TransportInfo
