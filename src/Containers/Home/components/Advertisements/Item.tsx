import { Text } from 'react-native'
import React from 'react'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'
import { AdvertisementsT } from '@/Store/Delivery/type'
import { Touchable } from '@/Components/Touchable'
import { navigate } from '@/Navigators/utils'

type Props = {
  advertise: AdvertisementsT
}
const AdvertisementsItem = ({ advertise }: Props) => {
  const { Fonts, Colors, MetricsSizes } = useTheme()

  return (
    <Touchable
      mr={MetricsSizes.tiny}
      w={MetricsSizes.deviceWidth * 0.8}
      // style={{ maxWidth: MetricsSizes.deviceWidth * 0.8 }}
      onPress={() => {
        navigate('AdvertisementScreen', { advertisements: advertise })
      }}
    >
      <Image
        source={{ uri: advertise?.imageDisplay ?? '' }}
        h={MetricsSizes.deviceWidth / 2.5}
        w={MetricsSizes.deviceWidth * 0.8}
        resizeMode="stretch"
      />
      <Text
        numberOfLines={2}
        style={[Fonts.textSmall, { color: Colors.black }]}
      >
        {advertise?.name}
      </Text>
    </Touchable>
  )
}

export default AdvertisementsItem
