import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'

type Props = {
  icon: number
  title: string
  isActive: boolean
}
const StatusOrder = ({ icon, title, isActive }: Props) => {
  const { Gutters, Fonts, Colors, MetricsSizes } = useTheme()

  return (
    <Container
      style={styles.container}
      pv={MetricsSizes.tiny}
      w={MetricsSizes.deviceWidth / 3 - MetricsSizes.tiny}
      bg={isActive ? Colors.white : Colors.grey4}
      ai="center"
      jc="center"
      br={MetricsSizes.tiny}
    >
      <Image
        source={icon}
        w={MetricsSizes.regular}
        h={MetricsSizes.regular}
        resizeMode="contain"
      />
      <Text
        style={[
          Fonts.textTiny,
          Fonts.textCenter,
          Gutters.tinyTMargin,
          { color: Colors.black },
        ]}
      >
        {title}
      </Text>
    </Container>
  )
}

export default StatusOrder

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
})
