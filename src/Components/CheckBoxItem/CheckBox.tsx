import React from 'react'
import Container from '../Container'
import Image from '../Image'
import { useTheme } from '@/Hooks'

type Props = {
  status: 'CHECKED' | 'UNCHECKED'
}
const CheckBox = ({ status }: Props) => {
  const { Images, Colors, MetricsSizes } = useTheme()

  return status === 'CHECKED' ? (
    <Container>
      <Image
        source={Images.tick}
        w={MetricsSizes.small}
        h={MetricsSizes.small}
        tintColor={Colors.primary}
        resizeMode="contain"
      />
    </Container>
  ) : (
    <Container
      w={MetricsSizes.small}
      h={MetricsSizes.small}
      bc={Colors.grey}
      bw={1}
      br={MetricsSizes.tiny / 2}
    />
  )
}

export default CheckBox
