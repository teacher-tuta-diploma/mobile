import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'

const SessionItem = () => {
  const { Colors, Fonts, FontSize, Images, MetricsSizes } = useTheme()

  return (
    <>
      <Container mt={MetricsSizes.tiny}>
        <Container ai="center" jc="space-between" flexDr="row">
          <Text style={[Fonts.textSmallBold, { color: Colors.white }]}>
            Phiên đăng nhập
          </Text>
          <Text style={[Fonts.textTiny, { color: Colors.secondary }]}>30s</Text>
        </Container>
        <Container
          mt={MetricsSizes.tiny}
          ai="center"
          jc="space-between"
          flexDr="row"
        >
          <Text
            style={
              (Fonts.textLargeBold,
              [
                {
                  fontSize: FontSize.regular * 2,
                  color: Colors.secondary,
                  fontWeight: 'bold',
                },
              ])
            }
          >
            076 777
          </Text>
          <Image
            source={Images.qr_code}
            w={MetricsSizes.small * 1.5}
            h={MetricsSizes.small * 1.5}
            tintColor={Colors.tabPrimary}
            resizeMode="contain"
          />
        </Container>
      </Container>
      <Container mt={MetricsSizes.tiny} mb={MetricsSizes.tiny}>
        <Text
          style={
            (Fonts.textTiny,
            [
              {
                color: Colors.tabPrimary,
              },
            ])
          }
        >
          Test@123
        </Text>
      </Container>
      <Container w={'100%'} h={1} bg={'#242525'} />
    </>
  )
}

export default SessionItem

const styles = StyleSheet.create({})
