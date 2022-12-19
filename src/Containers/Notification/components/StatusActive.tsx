import { Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'

type Props = {
  active: boolean
  title: string
}

const StatusActive = ({ active, title }: Props) => {
  const { Gutters, Colors, Fonts, MetricsSizes } = useTheme()

  if (active) {
    return (
      <Container
        style={[Gutters.smallHPadding]}
        pv={MetricsSizes.tiny / 2}
        bg={Colors.bgInactive}
        br={MetricsSizes.small}
      >
        <Text style={[Fonts.textSmall, { color: Colors.borderRed }]}>
          {title}
        </Text>
      </Container>
    )
  }

  return (
    <Container
      style={[Gutters.smallHPadding]}
      pv={MetricsSizes.tiny / 2}
      bg={Colors.grey4}
      br={MetricsSizes.small}
    >
      <Text style={[Fonts.textSmall, { color: Colors.black }]}>{title}</Text>
    </Container>
  )
}

export default StatusActive
