import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Container from '@/Components/Container'
import Header from '@/Components/Header'
import StatusOrder from './components/StatusOrder'
import { useTheme } from '@/Hooks'
// import { useStylesMyOrder } from './components/styles'
// import usePopupGlobal from '@/Hooks/usePopup'
import { Touchable } from '@/Components/Touchable'
import { useHandleGetListOrderQuery } from '@/Services/modules/users'
import OrderItem from './components/OrderItem'
import { MyOrderE } from '@/Store/Delivery/enum'
import { ListLoader } from '@/Components/ContentLoader'
import EmptyList from './components/EmtyList'
import { FlatList } from 'react-native'
import { OrderT } from '@/Store/Delivery/type'

const MyOrder = () => {
  const { Images, MetricsSizes } = useTheme()
  // const styles = useStylesMyOrder()
  // const popup = usePopupGlobal()
  const [orderStatus, setOrderStatus] = useState<MyOrderE>(MyOrderE.INPROGRESS)
  const [noMoreResults, setNoMoreResult] = useState(false)
  const [page, setPage] = useState(1)

  const [orders, setOrders] = useState<OrderT[]>([])
  const listStatus = useMemo(() => {
    switch (orderStatus) {
      case MyOrderE.INPROGRESS:
        return '4,5,6,10'
      case MyOrderE.WATING:
        return '1,2,3'
      case MyOrderE.FINISHED:
        return '7,8,9'

      default:
        return '1,2,3'
    }
  }, [orderStatus])

  const propsGetListOrder = useHandleGetListOrderQuery(
    {
      listStatus,
      page,
      limit: 11,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: noMoreResults,
    },
  )

  // TODO Test FUNCTIONS
  // const onShowPopup = useCallback(() => {
  //   popup?.showPopup?.(
  //     <Container
  //       as="center"
  //       bg={Colors.white}
  //       br={MetricsSizes.tiny}
  //       style={styles.popup}
  //     >
  //       <DriverReceive />
  //     </Container>,
  //   )
  // }, [Colors.white, MetricsSizes.tiny, popup, styles.popup])

  /**
   * TODO set lại page = 1 để lấy list từ đầu
   */
  const onRefresh = useCallback(() => {
    if (page > 1) {
      setPage(1)
      setNoMoreResult(false)
    }
    propsGetListOrder.refetch()
  }, [page, propsGetListOrder])

  const renderItem = useCallback(({ item }: any) => {
    return (
      <OrderItem
        {...{
          order: item,
        }}
      />
    )
  }, [])

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  /**
   * TODO: nếu fetch về danh sách và đang loadmore page > 1 thì nối thêm data
   * * nếu là từ đầu thì set mảng mơi
   */
  useEffect(() => {
    if (propsGetListOrder.currentData?.data?.length) {
      if (page > 1) {
        setOrders(os => [...os, ...propsGetListOrder.currentData?.data!])
      } else {
        setOrders(propsGetListOrder.currentData?.data!)
      }
    }
  }, [page, propsGetListOrder.currentData?.data])

  /**
   * TODO: nếu gọi api thành công và trả về rỗng thì skip api get order
   */
  useEffect(() => {
    if (propsGetListOrder.isSuccess && !propsGetListOrder.data?.data.length) {
      setNoMoreResult(true)
    }
  }, [propsGetListOrder.data?.data.length, propsGetListOrder.isSuccess])

  return (
    <Container flex={1}>
      <Header noBack title="Chuyến hàng của tôi" />
      <Container
        mh={MetricsSizes.tiny}
        mv={MetricsSizes.tiny}
        flexDr="row"
        jc={'space-around'}
      >
        <Touchable
          onPress={() => {
            setOrderStatus(MyOrderE.INPROGRESS)
            setPage(1)
            setNoMoreResult(false)
          }}
        >
          <StatusOrder
            icon={Images.order_processing}
            title="Chuyến đang xử lý"
            isActive={orderStatus === MyOrderE.INPROGRESS}
          />
        </Touchable>
        <Touchable
          onPress={() => {
            setOrderStatus(MyOrderE.WATING)
            setPage(1)
            setNoMoreResult(false)
          }}
        >
          <StatusOrder
            icon={Images.order_wait}
            title="Chuyến chờ xử lý"
            isActive={orderStatus === MyOrderE.WATING}
          />
        </Touchable>
        <Touchable
          onPress={() => {
            setOrderStatus(MyOrderE.FINISHED)
            setPage(1)
            setNoMoreResult(false)
          }}
        >
          <StatusOrder
            icon={Images.order_done}
            title="Chuyến đã xử lý"
            isActive={orderStatus === MyOrderE.FINISHED}
          />
        </Touchable>
      </Container>

      <Container flex={1}>
        {page !== 1 || !propsGetListOrder.isFetching ? (
          <>
            {propsGetListOrder.isError ? (
              <EmptyList />
            ) : (
              <>
                <FlatList
                  data={orders}
                  onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                      setPage(v => v + 1)
                    }
                  }}
                  scrollEventThrottle={400}
                  // Item
                  // itemHeight={MetricsSizes.large * 2.8}
                  renderItem={renderItem}
                  ListEmptyComponent={() => <EmptyList />}
                  refreshing={propsGetListOrder.isFetching}
                  onRefresh={onRefresh}
                  onEndReachedThreshold={0.5}
                  // onEndReached={() => setPage(v => v + 1)}
                />
              </>
            )}
          </>
        ) : (
          <ListLoader />
        )}
      </Container>

      {/* <Touchable
        ph={MetricsSizes.tiny}
        pv={MetricsSizes.tiny}
        bc={Colors.borderGreen2}
        bw={1}
        mh={MetricsSizes.tiny}
        mv={MetricsSizes.small}
        br={MetricsSizes.tiny}
        onPress={() => {
          navigate('WaitingDetailAdviseTrip', {})
        }}
      >
        <Text>Chuyến chờ xử lý</Text>
      </Touchable>
      <Touchable
        ph={MetricsSizes.tiny}
        pv={MetricsSizes.tiny}
        bc={Colors.borderGreen2}
        bw={1}
        mh={MetricsSizes.tiny}
        mv={MetricsSizes.small}
        br={MetricsSizes.tiny}
        onPress={() => {
          navigate('DetailsOrderCompleted', {})
        }}
      >
        <Text>Chi tiết đơn đã hoàn thành</Text>
      </Touchable>
      <Touchable
        ph={MetricsSizes.tiny}
        pv={MetricsSizes.tiny}
        bc={Colors.borderGreen2}
        bw={1}
        mh={MetricsSizes.tiny}
        mv={MetricsSizes.small}
        br={MetricsSizes.tiny}
        onPress={() => {
          navigate('WaitingDeliveryOrder', {})
        }}
      >
        <Text>Chi tiết đơn đang giao</Text>
      </Touchable> */}
    </Container>
  )
}

export default MyOrder
