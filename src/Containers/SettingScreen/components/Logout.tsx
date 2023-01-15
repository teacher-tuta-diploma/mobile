import { Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import { Touchable } from '@/Components/Touchable'
import ButtonGradient from '@/Components/ButtonGradient'
import LinearGradient from 'react-native-linear-gradient'
import useBottomSheet from '@/Hooks/useBottomSheet'

const Logout = () => {
  const { Colors, Fonts, MetricsSizes, Gutters } = useTheme()
  const bottomSheet = useBottomSheet()

  return (
    <Container bg={Colors.backgroundSecondary} flex={1} ai="center">
      <Text
        style={[
          Fonts.textLargeBold,
          Gutters.smallTMargin,
          { color: Colors.white },
        ]}
      >
        Đăng xuất
      </Text>
      <Text
        style={[
          Fonts.textSmall,
          Gutters.tinyTMargin,
          { color: Colors.textSecondary },
        ]}
      >
        Bạn có muốn đăng xuất không
      </Text>
      <Container flexDr="row" mt={MetricsSizes.large}>
        <LinearGradient
          style={{
            borderRadius: MetricsSizes.tiny,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}
          colors={Colors.backgroundGradientPrimary}
          useAngle
          angle={90}
        >
          <Touchable
            onPress={() => {
              bottomSheet?.onCloseBottomSheet?.()
            }}
            pv={MetricsSizes.tiny * 1.2}
            bg={Colors.backgroundSecondary}
            br={MetricsSizes.tiny}
            w={MetricsSizes.large * 1.6}
            ai="center"
          >
            <Text style={[Fonts.textRegular, { color: Colors.textPrimary }]}>
              Hủy bỏ
            </Text>
          </Touchable>
        </LinearGradient>
        <Container w={MetricsSizes.tiny} />
        <ButtonGradient text="Đăng xuất" w={MetricsSizes.large * 2} noMargin />
      </Container>
    </Container>
  )
}

export default Logout
