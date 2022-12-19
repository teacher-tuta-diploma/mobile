import { Text } from 'react-native'
import React, { useState } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import { Touchable } from '@/Components/Touchable'

type Props = {
  title: string
  image: number
  onPress: () => void
}
const Func = ({ title, image, onPress }: Props) => {
  const { Gutters, Fonts, Images, Colors, MetricsSizes } = useTheme()
  const [isPress, setIsPress] = useState(false)
  return (
    <Touchable
      onPressIn={() => setIsPress(true)}
      onPressOut={() => setIsPress(false)}
      onPress={onPress}
      pv={MetricsSizes.tiny}
      ai="center"
      jc="space-between"
      flexDr="row"
      bg={isPress ? Colors.bgRed : Colors.white}
      activeOpacity={isPress ? 0.5 : 1}
      ph={MetricsSizes.tiny}
    >
      <Container ai="center" flexDr="row">
        <Image
          source={image}
          w={MetricsSizes.tiny * 1.5}
          h={MetricsSizes.tiny * 1.5}
          resizeMode="contain"
        />
        <Text
          style={[
            Fonts.textSmall,
            Gutters.tinyLMargin,
            { color: isPress ? Colors.white : Colors.grey3 },
          ]}
        >
          {title}
        </Text>
      </Container>
      {isPress ? (
        <Image
          source={Images.arrow_right}
          w={MetricsSizes.tiny}
          h={MetricsSizes.tiny}
          resizeMode="contain"
          tintColor={Colors.white}
        />
      ) : (
        <Image
          source={Images.arrow_right}
          w={MetricsSizes.tiny}
          h={MetricsSizes.tiny}
          resizeMode="contain"
          tintColor={Colors.grey}
        />
      )}
    </Touchable>
  )
}

export default Func
