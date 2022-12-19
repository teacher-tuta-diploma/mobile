import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'

const Checkbox = () => {
  const { Colors, MetricsSizes } = useTheme()
  return (
    <Container
      bc={Colors.grey}
      bw={1}
      br={2}
      w={MetricsSizes.small}
      h={MetricsSizes.small}
      ai="center"
      jc="center"
    >
      <Container
        w={MetricsSizes.small - 5}
        h={MetricsSizes.small - 5}
        bg={Colors.primary}
      />
    </Container>
  )
}

export default Checkbox
