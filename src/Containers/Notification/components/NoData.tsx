import { Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'

type Props = {
  title: string
}

const NoData = ({ title }: Props) => {
  const { Colors, Fonts, MetricsSizes } = useTheme()

  return (
    <Container ai="center" w={MetricsSizes.deviceWidth}>
      <Text style={[Fonts.textRegular, { color: Colors.black }]}>{title}</Text>
    </Container>
  )
}

export default NoData
