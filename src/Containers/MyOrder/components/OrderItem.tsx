import { Text } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import ActionCallChat from '@/Components/ActionCallChat'
import { useStylesMyOrder } from './styles'
import { OrderT } from '@/Store/Delivery/type'
import { SortLocationT, StatusOrderE } from '@/Store/Delivery/enum'
import { numberWithCommas } from '@/Config/utils'
import {
  useHandleGetProductQuery,
  useLazyHandleGetOrderDetailQuery,
} from '@/Services/modules/users'
import { getSendTime } from '@/Config/api.helper'
import { Touchable } from '@/Components/Touchable'
import { navigate } from '@/Navigators/utils'
import { navigateOrder } from '@/Config/api.helper'
import _ from 'lodash'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import useOrder from '@/Hooks/useOrder'

type Props = {
  order: OrderT
}
const OrderItem = ({ order }: Props) => {
  const { Gutters, Fonts, Images, Colors, MetricsSizes } = useTheme()
  const [handleGetOrderDetail] = useLazyHandleGetOrderDetailQuery()
  const propsGetProduct = useHandleGetProductQuery(
    {
      search: 'parentId:=:0',
    },
    {},
  )

  const styles = useStylesMyOrder()
  const loading = useLoadingGlobal()
  const orderHook = useOrder()

  const deliveryLocation = useMemo(() => {
    return order?.orderLocations.find(o => o.sort === SortLocationT.DELIVERY)
  }, [order?.orderLocations])
  /**
   * TODO: sắp xếp điểm nhận hang theo sort
   */
  const receiveLocations = useMemo(() => {
    return _.sortBy(
      order?.orderLocations.filter(o => o.sort !== SortLocationT.DELIVERY),
      o => o.sort,
    )
  }, [order?.orderLocations])

  const statusProcessing = useMemo(
    () =>
      order.status === StatusOrderE['Đã có tài xế'] ||
      order.status === StatusOrderE['Tài xế đang đến'] ||
      order.status === StatusOrderE['Tài xế đã đến'] ||
      order.status === StatusOrderE['Đang giao hàng'],
    [order.status],
  )

  const statusColor = useMemo(() => {
    switch (order?.status) {
      case StatusOrderE['Chuyến hàng mới']:
      case StatusOrderE['Chờ tư vấn']:
      case StatusOrderE['Đã tư vấn']:
        return Colors.blue
      case StatusOrderE['Đang giao hàng']:
      case StatusOrderE['Đã có tài xế']:
      case StatusOrderE['Tài xế đang đến']:
      case StatusOrderE['Tài xế đã đến']:
        return Colors.bgOrange
      case StatusOrderE['Hoàn thành']:
        return Colors.green1
      case StatusOrderE['Hủy']:
      case StatusOrderE['Thất bại']:
        return Colors.primary
      default:
        return Colors.black
    }
  }, [
    Colors.bgOrange,
    Colors.black,
    Colors.blue,
    Colors.green1,
    Colors.primary,
    order?.status,
  ])

  const getOrderDetail = useCallback(() => {
    console.log(
      '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    console.log(
      '🛠 LOG: 🚀 --> ~ file: OrderItem.tsx:91 ~ getOrderDetail ~ getOrderDetail',
      order,
    )
    console.log(
      '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    handleGetOrderDetail({
      orderCode: order?.code!,
    })
    navigateOrder(order, navigate)
  }, [handleGetOrderDetail, order])

  /**
   * TODO thời gian lấy hàng
   */
  const sendTime = useMemo(
    () => getSendTime(order?.pickupType, order?.pickupDate),
    [order?.pickupDate, order?.pickupType],
  )

  const handleCreateChannelChat = useCallback(async () => {
    try {
      const driveId = order?.vehicles?.[0]?.driverId
      if (driveId) {
        loading.toogleLoading?.(true, 'orderitem')

        await orderHook?.handleCreateChannelChat?.(order)
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
  }, [loading, order, orderHook])

  /**
   * TODO: Gọi tài xế thông qua số điện thoại
   */
  const onCallDriver = useCallback(async () => {
    orderHook.onCallDriver?.(order)
  }, [order, orderHook])

  return (
    <Touchable
      onPress={getOrderDetail}
      ph={MetricsSizes.tiny}
      pv={MetricsSizes.tiny}
      bc={statusColor}
      bw={1}
      mh={MetricsSizes.tiny}
      mv={MetricsSizes.tiny * 1.2}
      br={MetricsSizes.tiny}
    >
      <Container flexDr="row" ai="flex-start">
        <Image
          source={Images.circle}
          w={MetricsSizes.tiny}
          h={MetricsSizes.tiny}
          resizeMode="contain"
        />
        <Text
          style={[Fonts.textTiny, Gutters.tinyLMargin, { color: Colors.black }]}
          numberOfLines={1}
        >
          Điểm đi: {deliveryLocation?.location}
        </Text>
      </Container>
      <>
        {receiveLocations?.map(location => {
          return (
            <Container flexDr="row" ai="flex-start">
              <Image
                source={Images.to_location}
                w={MetricsSizes.tiny}
                h={MetricsSizes.tiny}
                resizeMode="contain"
              />
              <Text
                style={[
                  Fonts.textTiny,
                  Gutters.tinyLMargin,
                  { color: Colors.black },
                ]}
                numberOfLines={1}
              >
                Điểm đến: {location?.location}
              </Text>
            </Container>
          )
        })}
      </>
      <Text
        style={[
          Fonts.textTiny,
          Gutters.smallLMargin,
          { color: Colors.placeHolder },
        ]}
      >
        {order?.code} .{' '}
        {
          propsGetProduct.currentData?.data.find(e => e.id === order?.serviceId)
            ?.name
        }{' '}
        . {order?.distance ?? '(Không xác định)'}km .{' '}
        {order?.price ? numberWithCommas(+order?.price) : '(Không xác định)'}{' '}
        VND
      </Text>
      <Text
        style={[
          Fonts.textTiny,
          Gutters.smallLMargin,
          { color: Colors.placeHolder },
        ]}
      >
        {sendTime}
      </Text>
      <Text
        style={[
          Fonts.textTiny,
          Gutters.smallLMargin,
          Gutters.tinyTMargin,
          { color: statusColor },
        ]}
      >
        {StatusOrderE[order.status].toUpperCase()}
      </Text>
      {statusProcessing && (
        <Container style={styles.action}>
          <ActionCallChat
            onCall={onCallDriver}
            onChat={handleCreateChannelChat}
          />
        </Container>
      )}
    </Touchable>
  )
}

export default OrderItem
