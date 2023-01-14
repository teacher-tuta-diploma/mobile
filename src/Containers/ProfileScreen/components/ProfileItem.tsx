import { Text } from 'react-native'
import React from 'react'
import { Touchable } from '@/Components/Touchable'
import { useTheme } from '@/Hooks'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'

export type Props = {
  name: string
  lastTime: string
  tags: string[]
  numberOnline: number
  totalOnline: number
}

const ProfileItem = ({
  name,
  lastTime,
  tags,
  numberOnline,
  totalOnline,
}: Props) => {
  const { Colors, Fonts, MetricsSizes, Gutters } = useTheme()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'ProfileDetailScreen'>>()

  return (
    <Touchable
      bg={Colors.backgroundSecondary}
      br={MetricsSizes.tiny}
      style={[Gutters.smallPadding, Gutters.smallBMargin]}
      onPress={() => {
        navigation.navigate('ProfileDetailScreen', { name: name })
      }}
    >
      <Text style={[Fonts.textLargeBold, { color: Colors.neutral500 }]}>
        {name}
      </Text>
      <Text
        style={[
          Fonts.textTiny,
          Gutters.tinyTMargin,
          { color: Colors.textSecondary },
        ]}
      >
        Đã sử dụng {lastTime} trước
      </Text>
      <Text
        style={[
          Fonts.textSmall,
          Gutters.tinyTMargin,
          { color: Colors.neutral500 },
        ]}
      >
        {tags.join(', ')}
      </Text>
      <Text
        style={[
          Fonts.textTiny,
          Gutters.tinyTMargin,
          { color: Colors.secondary },
        ]}
      >
        {`${numberOnline}/${totalOnline} đang hoạt động`}
      </Text>
    </Touchable>
  )
}

export default ProfileItem
