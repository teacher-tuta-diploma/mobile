import React from 'react'
import Container from '../Container'
import { useTheme } from '@/Hooks'

type Props = {
  status: 'CHECKED' | 'UNCHECKED'
}
const Option = ({ status }: Props) => {
  const { Colors, MetricsSizes } = useTheme()

  return status === 'CHECKED' ? (
    <Container
      w={MetricsSizes.tiny * 1.5}
      h={MetricsSizes.tiny * 1.5}
      bc={Colors.primary}
      ph={2}
      pv={2}
      bw={1}
      br={100}
    >
      <Container br={100} bg={Colors.primary} flex={1} />
    </Container>
  ) : (
    <Container
      w={MetricsSizes.tiny * 1.5}
      h={MetricsSizes.tiny * 1.5}
      bc={Colors.primary}
      bw={1}
      br={100}
    />
  )
}

export default Option
