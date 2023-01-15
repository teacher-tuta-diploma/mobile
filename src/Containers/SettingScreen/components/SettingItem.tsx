import { Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { Touchable } from '@/Components/Touchable'

type Props = {
  icon: number
  name: string
  onPress?: () => void
  noRightIcon?: boolean
  isLogout?: boolean
}

const SettingItem = ({ icon, name, onPress, noRightIcon, isLogout }: Props) => {
  const { Colors, MetricsSizes, Fonts, Icons, Gutters } = useTheme()
  return (
    <Touchable onPress={onPress}>
      <Container
        flexDr="row"
        pb={MetricsSizes.tiny}
        pt={MetricsSizes.tiny * 3}
        ai="center"
      >
        {isLogout ? (
          <Container>
            <Image
              source={Icons.logout1}
              h={MetricsSizes.small}
              w={MetricsSizes.small - 5}
              resizeMode="contain"
            />
            <Image
              source={Icons.logout2}
              h={MetricsSizes.small}
              w={MetricsSizes.small}
              resizeMode="contain"
              style={{ position: 'absolute', left: 3 }}
            />
          </Container>
        ) : (
          <Image
            source={icon}
            h={MetricsSizes.small}
            w={MetricsSizes.small}
            resizeMode="contain"
          />
        )}

        <Text
          style={[
            Fonts.textRegular,
            Gutters.smallLMargin,
            { color: Colors.grey5 },
          ]}
        >
          {name}
        </Text>
        <Container flex={1} />
        {!noRightIcon && (
          <Image
            source={Icons.arrow_right_2}
            h={MetricsSizes.small}
            w={MetricsSizes.small}
            resizeMode="contain"
          />
        )}
      </Container>
      <Container h={1} bg={Colors.backgroundSecondary} />
    </Touchable>
  )
}

export default SettingItem
