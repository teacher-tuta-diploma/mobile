import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../Container'
import { useTheme } from '@/Hooks'
import Image from '../Image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

type Props = {
  title: string
  noBack?: boolean
  textLarge?: boolean
}
const Header = ({ title, noBack = false, textLarge }: Props) => {
  const { Layout, Fonts, Icons, Colors, MetricsSizes } = useTheme()

  const navigation = useNavigation()

  return (
    <Container bg={Colors.black} pb={MetricsSizes.tiny} pt={MetricsSizes.small}>
      <SafeAreaView
        edges={['right', 'top', 'left']}
        style={[Layout.rowHCenter]}
      >
        {!noBack && (
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={Icons.back_2}
              w={MetricsSizes.regular}
              h={MetricsSizes.small}
              tintColor={Colors.tabPrimary}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {!noBack ? (
          <Container ai="center" flex={1}>
            <Text
              style={[
                textLarge ? Fonts.textLargeBold : Fonts.textRegularBold,
                { color: textLarge ? Colors.white : Colors.neutral500 },
              ]}
            >
              {title}
            </Text>
          </Container>
        ) : (
          <Text
            style={[
              textLarge ? Fonts.textRegularBold : Fonts.textRegularBold,
              { color: textLarge ? Colors.white : Colors.neutral500 },
            ]}
          >
            {title}
          </Text>
        )}
        {!noBack && <Container w={MetricsSizes.regular} />}
      </SafeAreaView>
    </Container>
  )
}

export default Header
