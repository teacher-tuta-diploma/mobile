import React from 'react'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'

const Loading = () => {
  const { Images, Colors, MetricsSizes } = useTheme()
  return (
    <Container
      style={{ position: 'absolute', zIndex: 999, top: 0, left: 0 }}
      w={MetricsSizes.deviceWidth}
      h={MetricsSizes.deviceHeight}
      bg={Colors.blurBg}
      ai="center"
      jc="center"
    >
      <Image
        w={MetricsSizes.large}
        h={MetricsSizes.large}
        source={Images.loading}
        resizeMode={'cover'}
      />
    </Container>
  )
}

export default Loading
