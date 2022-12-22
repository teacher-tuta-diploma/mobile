import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import CircleLoading from '@/Components/CircleLoading'

const Loading = () => {
  const { Colors } = useTheme()
  return (
    <Container style={{ flex: 1 }} bg={Colors.blurBg} ai="center" jc="center">
      <CircleLoading />
    </Container>
  )
}

export default Loading
