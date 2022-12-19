import React from 'react'
import Container from '../Container'
import { useTheme } from '@/Hooks'
import Image from '../Image'
import { Touchable } from '../Touchable'

type Props = {
  onCall?: () => void
  onChat?: () => void
}
const ActionCallChat = ({ onCall, onChat }: Props) => {
  const { Images, Colors, MetricsSizes } = useTheme()

  return (
    <Container flexDr="row">
      <Touchable
        onPress={onChat}
        w={MetricsSizes.regular}
        h={MetricsSizes.regular}
        br={MetricsSizes.regular / 2}
        bg={Colors.blue}
        bc={Colors.borderGreen}
        bw={1}
        ai="center"
        jc="center"
        mh={MetricsSizes.tiny}
      >
        <Image
          source={Images.message}
          w={MetricsSizes.small}
          h={MetricsSizes.small}
          resizeMode="contain"
        />
      </Touchable>
      <Touchable
        onPress={onCall}
        w={MetricsSizes.regular}
        h={MetricsSizes.regular}
        br={MetricsSizes.regular / 2}
        bg={Colors.bgRed}
        bc={Colors.borderRed}
        bw={1}
        ai="center"
        jc="center"
        mh={MetricsSizes.tiny}
      >
        <Image
          source={Images.call}
          w={MetricsSizes.small}
          h={MetricsSizes.small}
          resizeMode="contain"
        />
      </Touchable>
    </Container>
  )
}

export default ActionCallChat
