import { Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'

const EmptyList = () => {
  const { Colors, Fonts } = useTheme()

  return (
    <Container ai="center">
      <Text style={[Fonts.textRegular, { color: Colors.black }]}>
        Không có đơn hàng nào
      </Text>
    </Container>
  )
}

export default EmptyList
