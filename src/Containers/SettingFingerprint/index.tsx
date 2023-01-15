import { Text } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import Header from '@/Components/Header'
import Image from '@/Components/Image'
import Switch from '@/Components/Switch'

const SettingFingerprint = () => {
  const { Colors, MetricsSizes, Fonts, Icons, Gutters } = useTheme()
  const [value, setValue] = useState(false)
  return (
    <Container flex={1} ph={MetricsSizes.small} bg={Colors.black}>
      <Header title="Cài đặt vân tay" textLarge />
      <Container
        flexDr="row"
        ai="center"
        ph={MetricsSizes.small}
        pv={MetricsSizes.tiny}
        mt={MetricsSizes.regular}
        bg={Colors.backgroundSecondary}
        br={MetricsSizes.tiny}
      >
        <Image
          source={Icons.finger2}
          w={MetricsSizes.small}
          h={MetricsSizes.small}
          tintColor={Colors.tabPrimary}
          resizeMode="contain"
        />
        <Text
          style={[
            Fonts.textSmall,
            Gutters.tinyLMargin,
            { color: Colors.neutral600 },
          ]}
        >
          Đăng nhập bằng vân tay
        </Text>
        <Container flex={1} />
        <Switch value={value} onValueChange={() => setValue(v => !v)} />
      </Container>
    </Container>
  )
}

export default SettingFingerprint
