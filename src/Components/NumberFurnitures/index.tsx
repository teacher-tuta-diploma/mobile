import { Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import { Touchable } from '@/Components/Touchable'
import Image from '@/Components/Image'

type Props = {
  number?: Number
  state: 'update' | 'view'
  onPress?: () => void
}

const NumberFurnitures = ({ number = 0, state, onPress }: Props) => {
  const { Colors, MetricsSizes, Fonts, Images, Gutters, Common } = useTheme()
  return (
    <Touchable
      style={Common.shadowContainer}
      br={MetricsSizes.regular}
      mv={MetricsSizes.tiny}
      ph={MetricsSizes.tiny}
      pv={MetricsSizes.tiny}
      flexDr="row"
      jc="space-between"
      ai="center"
      onPress={onPress}
    >
      <Container flexDr="row" ai="center">
        <Image
          source={Images.move_furniture}
          w={MetricsSizes.regular}
          h={MetricsSizes.regular}
          resizeMode="contain"
        />
        <Text
          style={[
            Fonts.textSmall,
            Gutters.tinyLMargin,
            { color: Colors.black, fontWeight: '500' },
          ]}
        >
          {`Bạn có ${number} đồ đạc cần chuyển`}
        </Text>
      </Container>
      <Image
        source={state === 'update' ? Images.update_info : Images.open_eye}
        w={MetricsSizes.tiny * 1.5}
        h={MetricsSizes.tiny * 1.5}
        tintColor={state === 'update' ? Colors.grey : 'default'}
        resizeMode="contain"
      />
    </Touchable>
  )
}

export default NumberFurnitures
