import { Text } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import Container from '../Container'
import { useTheme } from '@/Hooks'
import Image from '../Image'
import ActionCallChat from '../ActionCallChat'
import { useAppSelector } from '@/Hooks/useApp'
import { NotificationDataT } from '@/Store/Message/type'
import {
  useHandleGetInfoDriverQuery,
  useHandleGetOrderDetailQuery,
} from '@/Services/modules/users'
import { ListLoader } from '../ContentLoader'
import { Touchable } from '../Touchable'
import { navigateAndReset } from '@/Navigators/utils'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import useOrder from '@/Hooks/useOrder'

type Props = {
  onClose?: (bool: boolean) => void
}
const DriverReceive = ({ onClose }: Props) => {
  const { Gutters, Fonts, Images, Colors, MetricsSizes, FontFamily } =
    useTheme()
  const loading = useLoadingGlobal()
  const orderHook = useOrder()
  const { notificationPusherData } = useAppSelector(state => state.message)

  const data = useMemo(() => {
    try {
      return JSON.parse(
        (notificationPusherData?.additionalData as any)?.data,
      ) as NotificationDataT
    } catch (error) {
      return undefined
    }
  }, [notificationPusherData?.additionalData])

  /**
   * TODO lấy thông tin order
   */
  const propsGetOrderDetail = useHandleGetOrderDetailQuery(
    {
      orderCode: data?.params?.code,
    },
    {
      skip: !data?.params?.code,
      refetchOnMountOrArgChange: true,
    },
  )

  /**
   * TODO lấy thông tin tài xế
   */
  const propsGetInfoDriver = useHandleGetInfoDriverQuery(
    {
      driveId: propsGetOrderDetail.currentData?.data?.vehicles?.[0]?.driverId!,
    },
    {
      skip: !propsGetOrderDetail.currentData?.data?.vehicles?.[0]?.driverId,
    },
  )

  const onMap = useCallback(() => {
    navigateAndReset(
      [
        { name: 'Main', params: { tab: 'Order' } },
        {
          name: 'FollowingMap',
          params: {
            orderLocations:
              propsGetOrderDetail.currentData?.data?.orderLocations ?? [],
            order: propsGetOrderDetail.currentData?.data,
          },
        },
      ],
      1,
    )
    onClose?.(false)
  }, [onClose, propsGetOrderDetail.currentData?.data])

  const handleCreateChannelChat = useCallback(async () => {
    try {
      const driveId =
        propsGetOrderDetail?.currentData?.data?.vehicles?.[0]?.driverId
      if (driveId) {
        loading.toogleLoading?.(true, 'orderitem')

        await orderHook?.handleCreateChannelChat?.(
          propsGetOrderDetail.currentData?.data!,
        )
      }
    } catch (error) {
      console.log(
        '🛠 LOG: 🚀 --> ---------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      console.log(
        '🛠 LOG: 🚀 --> ~ file: OrderItem.tsx:190 ~ handleCreateChannelChat ~ error',
        error,
      )
      console.log(
        '🛠 LOG: 🚀 --> ---------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
    } finally {
      loading.toogleLoading?.(false, 'orderitem')
    }
  }, [loading, orderHook, propsGetOrderDetail.currentData?.data])

  /**
   * TODO: Gọi tài xế thông qua số điện thoại
   */
  const onCallDriver = useCallback(async () => {
    orderHook.onCallDriver?.(propsGetOrderDetail.currentData?.data!)
  }, [orderHook, propsGetOrderDetail.currentData?.data])

  return (
    <Touchable
      activeOpacity={1}
      onPress={onMap}
      w={MetricsSizes.deviceWidth - MetricsSizes.regular}
    >
      <>
        <Container pv={MetricsSizes.tiny} jc="center" flexDr="row" ai="center">
          <Image
            source={Images.icon}
            w={MetricsSizes.small}
            h={MetricsSizes.small}
            resizeMode="contain"
          />
          <Text
            style={[
              Fonts.textSmall,
              Gutters.tinyLMargin,
              { color: Colors.placeHolder, fontFamily: FontFamily.NunitoBold },
            ]}
          >
            Tài xế nhận chuyến hàng
          </Text>
        </Container>
        <Container w={'100%'} h={1} bg={Colors.primary} />
        {propsGetOrderDetail.isFetching || propsGetInfoDriver.isFetching ? (
          <ListLoader />
        ) : (
          <Container
            mv={MetricsSizes.small}
            ph={MetricsSizes.tiny}
            flexDr="row"
          >
            <Container flex={0.2}>
              <Image
                source={Images.icon}
                w={MetricsSizes.large}
                h={MetricsSizes.large}
                resizeMode="contain"
                br={MetricsSizes.large / 2}
              />
            </Container>
            <Container flex={0.5}>
              <Text
                style={[
                  Fonts.textSmall,
                  { color: Colors.black, fontFamily: FontFamily.NunitoBold },
                ]}
              >
                {propsGetInfoDriver.currentData?.name}
              </Text>
              <Text style={[Fonts.textSmall, { color: Colors.black }]}>
                {propsGetInfoDriver.currentData?.phone}
              </Text>
              <Text style={[Fonts.textSmall, { color: Colors.black }]}>
                {
                  propsGetOrderDetail.currentData?.data
                    .orderVehicleCategories?.[0]?.name
                }
              </Text>
              <Text style={[Fonts.textSmall, { color: Colors.black }]}>
                Biển số xe:{' '}
                {
                  propsGetOrderDetail.currentData?.data.vehicles?.[0]
                    ?.licensePlatese
                }
              </Text>
            </Container>
            <Container ai="flex-end" flex={0.3}>
              <ActionCallChat
                onCall={onCallDriver}
                onChat={handleCreateChannelChat}
              />
            </Container>
          </Container>
        )}
      </>
    </Touchable>
  )
}

export default DriverReceive
