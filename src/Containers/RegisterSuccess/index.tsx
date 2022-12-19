import { Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { navigateAndReset, RootStackParamList } from '@/Navigators/utils'
import { api } from '@/Services/api'
import { useDispatch } from 'react-redux'
import i18next from 'i18next'
import { RouteProp, useRoute } from '@react-navigation/native'
import { setAccessToken } from '@/Store/Authentication'

const RegisterSuccess = () => {
  const { Gutters, Fonts, Common, Images, Colors, MetricsSizes } = useTheme()
  const dispatch = useDispatch()
  const route = useRoute<RouteProp<RootStackParamList, 'RegisterSuccess'>>()
  useEffect(() => {
    return () => {
      dispatch(api.util.resetApiState())
    }
  }, [dispatch])

  const onLogin = useCallback(() => {
    if (route.params.accessToken) {
      dispatch(setAccessToken({ accessToken: route.params.accessToken }))
    } else {
      navigateAndReset([{ name: 'LoginScreen' }])
    }
  }, [dispatch, route.params.accessToken])

  return (
    <SafeAreaView>
      <Container mh={MetricsSizes.tiny}>
        <Container ai="center">
          <Text
            style={[Fonts.textLarge, Fonts.textCenter, { color: Colors.note }]}
          >
            {i18next.t('registerSuccess.title')}
          </Text>
          <Container mv={MetricsSizes.regular}>
            <Image
              source={Images.booknow}
              w={MetricsSizes.large * 2}
              h={MetricsSizes.large * 2}
              resizeMode="contain"
            />
          </Container>
          <Text
            style={[Fonts.textSmall, Fonts.textCenter, { color: Colors.grey3 }]}
          >
            {i18next.t('registerSuccess.request')}
          </Text>
        </Container>
        <Container flex={1}>
          <TouchableOpacity
            onPress={onLogin}
            style={[
              Common.button.rounded,
              { backgroundColor: Colors.primary },
              Gutters.tinyTMargin,
            ]}
          >
            <Text style={[Fonts.textRegular]}>{i18next.t('Login.name')}</Text>
          </TouchableOpacity>
        </Container>
      </Container>
    </SafeAreaView>
  )
}

export default RegisterSuccess
