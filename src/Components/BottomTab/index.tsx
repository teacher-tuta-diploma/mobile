import React, { useEffect, useMemo, useState } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Container from '../Container'
import { useTheme } from '@/Hooks'
import { Touchable } from '../Touchable'
import Image from '../Image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-utils-scale'
import PopupMessage from './components/PopupMessage'
import { useAppSelector } from '@/Hooks/useApp'
import { Platform } from 'react-native'
import { NotificationDataT } from '@/Store/Message/type'
import LinearGradient from 'react-native-linear-gradient'

const BottomTab = ({ navigation, state }: BottomTabBarProps) => {
  const { Colors, Images, MetricsSizes } = useTheme()
  const inset = useSafeAreaInsets()
  const { notificationPusherData } = useAppSelector(s => s.message)

  const [dataNotify, setDataNotify] = useState<NotificationDataT>()

  const icons = useMemo(() => {
    // eslint-disable-next-line no-sparse-arrays
    return [
      {
        name: 'Home',
        icon: Images.home,
      },
      {
        name: 'Order',
        icon: Images.order,
      },
      {
        name: 'Qrcode',
        icon: Images.qr_code,
      },
      {
        name: 'Notifications',
        icon: Images.bell,
      },
      {
        name: 'Profile',
        icon: Images.user_round,
      },
      ,
    ]
  }, [
    Images.bell,
    Images.home,
    Images.order,
    Images.qr_code,
    Images.user_round,
  ])

  const routes = useMemo(() => {
    return state.routes.map((value, index) => {
      const isFocused = state.index === index
      const onPress = () => {
        navigation.navigate(value.name)
      }
      if (index === 2) {
        return (
          <Touchable onPress={onPress} mt={-MetricsSizes.large / 2}>
            <LinearGradient
              style={{
                width: MetricsSizes.large,
                height: MetricsSizes.large,
                borderRadius: MetricsSizes.large / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={Colors.backgroundGradientPrimary}
              useAngle
              angle={90}
            >
              <Image
                source={Images.qr_code}
                w={MetricsSizes.small * 1.5}
                h={MetricsSizes.small * 1.5}
                resizeMode="contain"
              />
            </LinearGradient>
          </Touchable>
        )
      }
      return (
        <Touchable
          key={index}
          ai="center"
          bg={isFocused ? Colors.grey4 : Colors.transparent}
          onPress={onPress}
          br={MetricsSizes.tiny / 2}
          ph={MetricsSizes.tiny / 2}
          pv={MetricsSizes.tiny / 2}
        >
          <Image
            w={MetricsSizes.regular}
            h={MetricsSizes.regular}
            source={icons[index]?.icon}
            resizeMode={'contain'}
          />
        </Touchable>
      )
    })
  }, [
    Colors.backgroundGradientPrimary,
    Colors.grey4,
    Colors.transparent,
    Images.qr_code,
    MetricsSizes.large,
    MetricsSizes.regular,
    MetricsSizes.small,
    MetricsSizes.tiny,
    icons,
    navigation,
    state.index,
    state.routes,
  ])

  /**
   * TODO: sau 5s thì ẩn thông báo đi
   */
  useEffect(() => {
    if (dataNotify) {
      setTimeout(() => {
        setDataNotify(undefined)
      }, 5000)
    }
  }, [dataNotify])

  /**
   * TODO: convert dataNotify từ data server bắn về
   */
  useEffect(() => {
    setDataNotify(_ => {
      try {
        return JSON.parse(
          (notificationPusherData?.additionalData as any)?.data,
        ) as NotificationDataT
      } catch (error) {
        return undefined
      }
    })
  }, [notificationPusherData?.additionalData])

  return (
    <Container
      pv={MetricsSizes.tiny}
      pb={Platform.OS === 'ios' ? inset.bottom : MetricsSizes.tiny}
      bg={Colors.backgroundSecondary}
      jc="space-around"
      flexDr="row"
      br={MetricsSizes.tiny}
      bc="#000707"
    >
      {routes}
    </Container>
  )
}

export default BottomTab
