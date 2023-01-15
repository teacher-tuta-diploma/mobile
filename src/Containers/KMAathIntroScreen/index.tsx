import { ScrollView, Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Header from '@/Components/Header'

const KMAathIntroScreen = () => {
  const { Gutters, Colors, Fonts } = useTheme()
  return (
    <Container flex={1} bg={Colors.black} style={Gutters.smallHPadding}>
      <Header title="Giới thiệu KMAath" textLarge />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Text
          style={[
            Fonts.textRegularBold,
            Gutters.regularTMargin,
            { color: Colors.neutral600 },
          ]}
        >
          An toàn - Tiện lợi - Hiện đại KMAuthen là ứng dụng được phát triển với
          mục tiêu cung cấp một môi trường xác thực đa nhân tố an toàn dựa trên
          nền tảng công nghệ blockchain.
        </Text>
      </ScrollView>
    </Container>
  )
}

export default KMAathIntroScreen
