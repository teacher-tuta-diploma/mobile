import { Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'

type Props = {
  image: string
  title: string
}
const PromotionItem = ({ image, title }: Props) => {
  const { Fonts, Colors, MetricsSizes } = useTheme()

  return (
    <Container mr={MetricsSizes.tiny} w={MetricsSizes.deviceWidth / 2}>
      <Image
        source={{ uri: image }}
        w={MetricsSizes.deviceWidth / 2}
        h={MetricsSizes.deviceWidth / 3}
        resizeMode="stretch"
      />
      <Text
        numberOfLines={2}
        style={[Fonts.textSmall, { color: Colors.black }]}
      >
        {title}
      </Text>
    </Container>
  )
}

export default PromotionItem
