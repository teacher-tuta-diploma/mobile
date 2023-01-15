import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import { scale } from 'react-native-utils-scale'

const ActivitiyApp = () => {
  const { Images, MetricsSizes, Fonts, Colors } = useTheme()

  return (
    <Container
      ph={MetricsSizes.regular}
      pv={MetricsSizes.regular}
      bg={Colors.backgroundSecondary}
    >
      <Text style={[Fonts.textSmallBold, { color: Colors.white }]}>
        Tên app đăng nhập
      </Text>
      <Container h={scale(8)} />
      <Text style={[Fonts.textTiny, { color: Colors.textSecondary }]}>
        Đã sử dụng lần cuối 20 phút trước
      </Text>
      <Container h={scale(8)} />
      <Text style={[Fonts.textTiny, { color: Colors.textSecondary }]}>
        3PM 12:12:2022
      </Text>
      <Container h={scale(8)} />
      <Text style={[Fonts.textTiny, { color: Colors.textSecondary }]}>
        Thanh xuân, Hà Nội
      </Text>
      <Container h={scale(8)} />
      <Text style={[Fonts.textSmall, { color: Colors.white }]}>
        Ứng dụng ABC, Ứng dụng ABC
      </Text>
    </Container>
  )
}

export default ActivitiyApp

const styles = StyleSheet.create({})
