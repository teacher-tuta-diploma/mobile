import { Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'

type Props = {
  title: string
  content: string
}

const Item = ({ title, content }: Props) => {
  const { MetricsSizes, Colors, Fonts } = useTheme()
  return (
    <Container>
      <Container pv={MetricsSizes.tiny * 1.2}>
        <Text style={[Fonts.textTiny, { color: Colors.textSecondary }]}>
          {title}
        </Text>
        <Container h={MetricsSizes.tiny * 0.7} />
        <Text style={[Fonts.textSmallBold, { color: Colors.grey5 }]}>
          {content}
        </Text>
      </Container>
      <Container h={1} bg={Colors.backgroundSecondary} />
    </Container>
  )
}

export default Item
