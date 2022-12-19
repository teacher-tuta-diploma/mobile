import { Image, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React, { useCallback } from 'react'
import { useTheme } from '@/Hooks'
import { navigate } from '@/Navigators/utils'
import i18next from 'i18next'
import Container from '@/Components/Container'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as infoApp from '@/../app.json'
const StartContainer = () => {
  const { Common, Layout, Gutters, MetricsSizes, Fonts, Images, Colors } =
    useTheme()
  const inset = useSafeAreaInsets()
  const onLogin = useCallback(() => {
    navigate('LoginScreen', {})
  }, [])

  const onRegister = useCallback(() => {
    navigate('RegisterUserScreen', {})
  }, [])

  const { width, height } = { height: 30, width: 30 }
  return (
    <View style={[Common.backgroundPrimary, Layout.fill]}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.primary} />
      <View style={[Layout.alignItemsCenter, Gutters.largeTMargin]}>
        <Text style={[Fonts.textLarge]}>{i18next.t('app.title')}</Text>
      </View>
      <View style={[{ width, height }, Layout.selfCenter]}>
        <Image
          style={Layout.fullSize}
          source={Images.truck_icon}
          resizeMode={'contain'}
        />
      </View>
      <View style={[Gutters.tinyHMargin]}>
        <TouchableOpacity
          onPress={onLogin}
          style={[Common.button.outlineRounded, Gutters.tinyTMargin]}
        >
          <Text style={[Fonts.textRegular]}>{i18next.t('start.login')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRegister}
          style={[Common.button.outlineRounded, Gutters.tinyTMargin]}
        >
          <Text style={[Fonts.textRegular]}>{i18next.t('start.register')}</Text>
        </TouchableOpacity>
      </View>
      <Container
        position="absolute"
        ai="center"
        as="center"
        bottom={inset.bottom + MetricsSizes.tiny}
      >
        <Text style={[Fonts.textRegular]}>{(infoApp as any).updatedAt}</Text>
      </Container>
    </View>
  )
}

export default StartContainer

// const styles = StyleSheet.create({})
