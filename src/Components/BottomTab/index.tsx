import React, { useEffect, useMemo, useState } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Container from '../Container'
import { useTheme } from '@/Hooks'
import { Touchable } from '../Touchable'
import Image from '../Image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-utils-scale'
import { useAppSelector } from '@/Hooks/useApp'
import { NotificationDataT } from '@/Store/Message/type'
import LinearGradient from 'react-native-linear-gradient'
import { navigate } from '@/Navigators/utils'

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
        icon: Images.activity,
      },
      {
        name: 'Qrcode',
        icon: Images.qr_code,
      },
      {
        name: 'Notifications',
        icon: Images.identifier,
      },
      {
        name: 'Profile',
        icon: Images.setting,
      },
      ,
    ]
  }, [
    Images.activity,
    Images.home,
    Images.identifier,
    Images.qr_code,
    Images.setting,
  ])

  const iconActives = useMemo(() => {
    // eslint-disable-next-line no-sparse-arrays
    return [
      {
        name: 'Home',
        icon: Images.home_active,
      },
      {
        name: 'Order',
        icon: Images.activity_active,
      },
      {
        name: 'Qrcode',
        icon: Images.qr_code,
      },
      {
        name: 'Notifications',
        icon: Images.identifier_active,
      },
      {
        name: 'Profile',
        icon: Images.setting_active,
      },
      ,
    ]
  }, [
    Images.activity_active,
    Images.home_active,
    Images.identifier_active,
    Images.qr_code,
    Images.setting_active,
  ])

  const routes = useMemo(() => {
    return state.routes.map((value, index) => {
      const isFocused = state.index === index
      const onPress = () => {
        navigation.navigate(value.name)
      }
      if (index === 2) {
        return (
          <Touchable
            onPress={() => {
              navigate('QrcodeScan', undefined)
            }}
            mt={-MetricsSizes.large / 2}
          >
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
          onPress={onPress}
          br={MetricsSizes.tiny / 2}
          ph={MetricsSizes.tiny / 2}
          pv={MetricsSizes.tiny / 2}
        >
          <Image
            w={MetricsSizes.regular}
            h={MetricsSizes.regular}
            source={!isFocused ? icons[index]?.icon : iconActives[index]?.icon}
            resizeMode={'contain'}
          />
        </Touchable>
      )
    })
  }, [
    Colors.backgroundGradientPrimary,
    Images.qr_code,
    MetricsSizes.large,
    MetricsSizes.regular,
    MetricsSizes.small,
    MetricsSizes.tiny,
    iconActives,
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
    <Container>
      <Images.TabbarSvg
        style={{ position: 'absolute', top: -scale(56) }}
        width={MetricsSizes.deviceWidth}
        height={scale(160)}
      />
      <Container
        mh={MetricsSizes.tiny}
        jc="space-between"
        flexDr="row"
        mb={inset.bottom}
      >
        {routes}
      </Container>
    </Container>
  )
}

export default BottomTab
