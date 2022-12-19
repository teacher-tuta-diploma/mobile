import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'

interface Props {
  onPressIcon?: () => void
}
const Header = ({ onPressIcon }: Props) => {
  const {
    Gutters,

    Fonts,

    Images,
    Colors,
    MetricsSizes,
    FontFamily,
  } = useTheme()
  return (
    <Container style={[Gutters.tinyHMargin]} flexDr="row">
      <TouchableOpacity onPress={onPressIcon}>
        <Image
          source={Images.back}
          w={MetricsSizes.small}
          h={MetricsSizes.small}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text
        style={[
          Fonts.textRegular,
          Gutters.tinyLMargin,
          { color: Colors.grey3, fontFamily: FontFamily.NunitoBold },
        ]}
      >
        Thông tin đăng ký
      </Text>
    </Container>
  )
}

export default Header
