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
        name: 'Notifications',
        icon: Images.bell,
      },
      {
        name: 'Profile',
        icon: Images.user_round,
      },
      ,
    ]
  }, [Images.bell, Images.home, Images.order, Images.user_round])

  const routes = useMemo(() => {
    return state.routes.map((value, index) => {
      const isFocused = state.index === index
      const onPress = () => {
        navigation.navigate(value.name)
      }
      if (index === 2) {
        return (
          <>
            {dataNotify && !dataNotify?.params?.paymentVnpay && (
              <Container
                bottom={MetricsSizes.regular * 3}
                bg={Colors.green1}
                w={MetricsSizes.large * 5}
                position="absolute"
                ph={MetricsSizes.tiny}
                pv={MetricsSizes.tiny}
                br={MetricsSizes.tiny}
              >
                <PopupMessage />
              </Container>
            )}
            <Touchable
              onPress={() => {
                onPress()
              }}
              bg={isFocused ? Colors.grey4 : Colors.transparent}
              ai="center"
              br={MetricsSizes.tiny / 2}
              ph={MetricsSizes.tiny / 2}
              pv={MetricsSizes.tiny / 2}
            >
              <Image
                source={icons[index]?.icon}
                w={MetricsSizes.regular}
                h={MetricsSizes.regular}
                resizeMode="contain"
              />
              {notificationPusherData && (
                <Container
                  w={scale(10)}
                  h={scale(10)}
                  br={scale(5)}
                  bg={Colors.green2}
                  position="absolute"
                  right={0}
                />
              )}
            </Touchable>
          </>
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
    Colors.green1,
    Colors.green2,
    Colors.grey4,
    Colors.transparent,
    MetricsSizes.large,
    MetricsSizes.regular,
    MetricsSizes.tiny,
    dataNotify,
    icons,
    navigation,
    notificationPusherData,
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
      bg={Colors.bottomTab}
      jc="space-around"
      flexDr="row"
    >
      {routes}
    </Container>
  )
}

export default BottomTab
