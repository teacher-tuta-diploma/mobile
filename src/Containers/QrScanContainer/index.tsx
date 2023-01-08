import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Tabbar from './components/Tabbar'

const QrScanContainer = () => {
  const { Colors, Images, Fonts, MetricsSizes } = useTheme()
  const insets = useSafeAreaInsets()
  return (
    <Container flex={1} bg={Colors.backgroundPrimary}>
      <Container ph={MetricsSizes.tiny} pt={insets.top + MetricsSizes.tiny}>
        <Text style={[Fonts.textLargeBold, { color: Colors.white }]}>
          Hoạt động
        </Text>
      </Container>
      <Container pt={MetricsSizes.tiny} ph={MetricsSizes.tiny}>
        <Tabbar />
      </Container>
      <Images.TabbarSvg width={300} height={100} />
    </Container>
  )
}

export default QrScanContainer

const styles = StyleSheet.create({})
