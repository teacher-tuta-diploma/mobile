import { ScrollView, Text } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import Header from '@/Components/Header'
import Item from './components/Item'

const ProfileDetailScreen = () => {
  const { Colors, Gutters, MetricsSizes, Fonts, Images } = useTheme()
  const route = useRoute<RouteProp<RootStackParamList, 'ProfileDetailScreen'>>()

  return (
    <Container flex={1} bg={Colors.black} style={[Gutters.smallHPadding]}>
      <Header title={route.params.name} />
      <Container ai="center" pv={MetricsSizes.regular}>
        <Image
          source={Images.advise}
          h={MetricsSizes.large * 2}
          w={MetricsSizes.large * 2}
          resizeMode="cover"
          br={MetricsSizes.large}
        />
      </Container>
      <Container ai="center">
        <Text
          style={[
            Fonts.textSmallBold,
            Gutters.tinyBMargin,
            { color: Colors.grey5 },
          ]}
        >
          Tên nhà phát hành
        </Text>
      </Container>
      <Container flexDr="row" mb={MetricsSizes.regular}>
        <Container flex={1} ph={MetricsSizes.tiny / 2}>
          <Text style={[Fonts.textTiny, { color: Colors.textSecondary }]}>
            ID: 0458987t69ejgt85
          </Text>
        </Container>
        <Container flex={1.3} ph={MetricsSizes.tiny / 2}>
          <Text style={[Fonts.textTiny, { color: Colors.textSecondary }]}>
            Ngày phát hành: 11/11/1111
          </Text>
        </Container>
      </Container>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Item title="Chủ tài khoản" content="Nguyễn Văn C" />
        <Item title="Ngày sinh" content="14/06/1990" />
        <Item title="Giới tính" content="Nam" />
        <Item title="Bắt đầu" content="12/12/2012" />
        <Item title="Kết thúc" content="12/12/2027" />
        <Item title="Ứng dụng đang sử dụng" content="Figma, canva" />
      </ScrollView>
    </Container>
  )
}

export default ProfileDetailScreen
