import { Text, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import Container from '../Container'
import { useTheme } from '@/Hooks'
import Image from '../Image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

type Props = {
  title: string
  noBack?: boolean
}
const Header = ({ title, noBack = false }: Props) => {
  const { Layout, Gutters, Fonts, Images, Colors, MetricsSizes, FontFamily } =
    useTheme()

  const navigation = useNavigation()

  return (
    <Container bg={Colors.primary}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.primary} />
      <SafeAreaView
        edges={['right', 'top', 'left']}
        style={[Layout.rowHCenter]}
      >
        {!noBack && (
          <TouchableOpacity
            style={[Gutters.tinyHPadding, Gutters.tinyVPadding]}
            onPress={navigation.goBack}
          >
            <Image
              source={Images.back}
              w={MetricsSizes.tiny * 1.5}
              h={MetricsSizes.tiny * 1.5}
              tintColor={Colors.white}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <Text
          style={[
            Fonts.textRegular,
            Gutters.tinyVPadding,
            Gutters.tinyLPadding,
            { fontFamily: FontFamily.NunitoBold },
          ]}
        >
          {title}
        </Text>
      </SafeAreaView>
    </Container>
  )
}

export default Header
