import { alertError } from '@/Config/alert.helper'
import { formatDeliveryDateTime } from '@/Config/utils'
import { useAppSelector } from '@/Hooks/useApp'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import { GetSendbirdSDK } from '@/Hooks/useSendBird'
import { navigate } from '@/Navigators/utils'
import {
  useHandleChoiceFitmentForOrderMutation,
  useHandleChoiceServiceForOrderMutation,
  useHandleCreateOrderLocationMutation,
  useHandleCreateOrderMutation,
  useHandleExpectedFeeMutation,
  useHandleGetDistanceMutation,
  useHandleGetOrderByCodeQuery,
  useHandlePutFeeForOrderMutation,
  useHandlePutTimeForOrderMutation,
  useHandletransportFeeMutation,
  useHandlUpdateOrderLocationMutation,
  useLazyHandleGetInfoDriverQuery,
} from '@/Services/modules/users'
import {
  FeeE,
  LocationTypeE,
  NameFeeE,
  PickupTypeE,
  StatusOrderE,
} from '@/Store/Delivery/enum'
import { ExpectedFeeT, OrderT } from '@/Store/Delivery/type'
import { SendbirdCalls } from '@sendbird/calls-react-native'
import { ApplicationUserListQueryParams } from '@sendbird/chat'
import {
  GroupChannelCreateParams,
  GroupChannelListQuery,
  GroupChannelListQueryParams,
  QueryType,
} from '@sendbird/chat/groupChannel'
import _ from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

export type OrderContextType = {
  putServicesForOrder: () => void
  putPickupDateForOrder: () => void
  putFeeAndDistanceForOrder: () => void
  callFeeServicesOfOrder: (expeactedFees: ExpectedFeeT[]) => void
  callTransportFeeOfOrder: () => void
  putDeliveryLocationsForOrder: () => void
  putReceiveLocationsForOrder: () => void
  totalDistance: number
  feeService: number
  deliveryFee: number
  propsCreateOrderLocationOfOrder: any
  propsCalTransportFeeOfOrder: any
  propsCalExpectedFeeOfOrder: any
  propsUpdateOrderLocationOfOrder: any
  propsChoiceServiceOfOrder: any
  reset: any
  putFitments: () => void
  putFeeAndDistanceAdvised: () => void
  distances: Set<number>
  setExpectedFees: React.Dispatch<
    React.SetStateAction<ExpectedFeeT[] | undefined>
  >
  onCallDriver: (order: OrderT) => void
  handleCreateChannelChat: (order: OrderT) => void
}

export const OrderContext = React.createContext<Partial<OrderContextType>>({})

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const delivery = useAppSelector(state => state.delivery)
  const [distances, setDistances] = useState(new Set<number>())
  const [expectedFees, setExpectedFees] = useState<ExpectedFeeT[]>()
  const loading = useLoadingGlobal()

  const [handleCalExpectedFee, propsCalExpectedFee] =
    useHandleExpectedFeeMutation({
      fixedCacheKey: 'expectedFee',
    })

  const [handleCalTransportFee, propsCalTransportFee] =
    useHandletransportFeeMutation({
      fixedCacheKey: 'transportFee',
    })
  /**
   * TODO tính tổng quãng đường đi
   */
  const totalDistance = useMemo(
    () =>
      _.compact(Array.from(distances)).reduce(
        (acc, distance) => acc + distance,
        0,
      ) / 1000,
    [distances],
  ) //

  /**
   * TODO: tính tổng phí dịch vụ
   */
  const feeService = useMemo(() => {
    const expectedFee = propsCalExpectedFee.data?.data.reduce(
      (sum, fee) => (fee.key === FeeE.PROMO ? sum : sum + fee.price),
      0,
    )
    return expectedFee ?? 0
  }, [propsCalExpectedFee.data?.data])

  /**
   * TODO: tính tổng phí phương tiện vận chuyển và phí dịch vụ
   */
  const deliveryFee = useMemo(() => {
    return propsCalTransportFee.data?.data ?? 0
  }, [propsCalTransportFee.data?.data])

  const [, propsCreateOrder] = useHandleCreateOrderMutation({
    fixedCacheKey: 'createOrders',
  })
  /**
   * TODO GET order location đã có trong order
   */
  const propsGetOrderByCode = useHandleGetOrderByCodeQuery(
    {
      code: propsCreateOrder.data?.data?.code ?? '',
      limit: 11,
      page: 1,
    },
    {
      skip: !propsCreateOrder.data?.data?.code,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  )
  /**
   * TODO lấy thông tin tài xế
   */
  const [handleGetInfoDriver] = useLazyHandleGetInfoDriverQuery()

  const [handleCreateOrderLocation, propsCreateOrderLocation] =
    useHandleCreateOrderLocationMutation({
      fixedCacheKey: 'createOrderLocation',
    })
  const [handleUpdateOrderLocation, propsUpdateOrderLocation] =
    useHandlUpdateOrderLocationMutation({
      fixedCacheKey: 'updateOrderLocation',
    })

  const [handleChoiceService, propsChoiceService] =
    useHandleChoiceServiceForOrderMutation({
      fixedCacheKey: 'pushService',
    })

  const [handleChoiceTime] = useHandlePutTimeForOrderMutation({
    fixedCacheKey: 'pushPickupTime',
  })

  const [handlePutFeeForOrder] = useHandlePutFeeForOrderMutation({
    fixedCacheKey: 'pushFeeAndDistance',
  })

  const [handleGetDistance] = useHandleGetDistanceMutation({
    fixedCacheKey: 'getDistance',
  })

  const [handleChoiceFitment, { reset: resetFitments }] =
    useHandleChoiceFitmentForOrderMutation({
      fixedCacheKey: 'choiceFitments',
    })
  /**
   * TODO cập nhật dịch vụ được chọn cho order
   */
  const putServices = useCallback(() => {
    handleChoiceService({
      orderCode: propsCreateOrder.data?.data.code ?? '',
      products:
        delivery.selectedServices?.map(service => ({
          id: service.id,
        })) ?? [],
    })
  }, [
    delivery.selectedServices,
    handleChoiceService,
    propsCreateOrder.data?.data.code,
  ])

  /**
   * TODO cập nhật thời gian và kiểu thời gian giao
   */
  const putPickupDate = useCallback(() => {
    let body: any = {
      orderCode: propsCreateOrder.data?.data.code ?? '',
      pickupType: delivery.isNow ? PickupTypeE.NOW : PickupTypeE.BOOKING,
    }
    if (delivery.isNow) {
      body = {
        ...body,
      }
    } else {
      body = {
        ...body,
        pickupDate: delivery.date ?? new Date(),
      }
    }
    handleChoiceTime(body)
  }, [
    delivery.date,
    delivery.isNow,
    handleChoiceTime,
    propsCreateOrder.data?.data.code,
  ])

  /**
   * TODO truyền lên order khoảng cách và giá tiền tính được
   */
  const putFeeAndDistance = useCallback(() => {
    handlePutFeeForOrder({
      distance: totalDistance,
      orderCode: propsCreateOrder.data?.data.code ?? '',
      price: feeService,
    })
  }, [
    feeService,
    handlePutFeeForOrder,
    propsCreateOrder.data?.data.code,
    totalDistance,
  ])

  /**
   * TODO truyền lên order khoảng cách và reset giá khi chọn tư vấn khảo sát
   */
  const putFeeAndDistanceAdvised = useCallback(() => {
    handlePutFeeForOrder({
      distance: totalDistance,
      orderCode: propsCreateOrder.data?.data.code ?? '',
      price: 0,
    })
  }, [handlePutFeeForOrder, propsCreateOrder.data?.data.code, totalDistance])

  const putFitments = useCallback(() => {
    handleChoiceFitment({
      orderFitmentItems:
        delivery.fitments?.map(fit => ({
          fitmentItemId: fit.id,
          quantity: fit.quantity,
        })) ?? [],
      orderCode: propsCreateOrder.data?.data?.code ?? '',
    })
  }, [
    delivery.fitments,
    handleChoiceFitment,
    propsCreateOrder.data?.data?.code,
  ])

  /**
   * TODO: gọi api tính các loại phí và phí vận chuyển
   * * phí vận chuyển lấy khoảng cách để tính ra giá
   */
  const calFeeServices = useCallback(() => {
    handleCalExpectedFee({
      promoCode: '',
      orderCode: propsCreateOrder.data?.data?.code ?? '',
      expectFee: [
        {
          key: FeeE.VC,
          name: NameFeeE.VC,
          price: propsCalTransportFee.data?.data ?? 0,
        },
        ...(delivery.selectedServices?.map(service => ({
          key: service.id.toString(),
          name: service.title,
          price: Number(service.price),
        })) ?? []),
        ...(expectedFees ?? []),
      ],
    })
  }, [
    handleCalExpectedFee,
    propsCreateOrder.data?.data?.code,
    propsCalTransportFee.data?.data,
    delivery.selectedServices,
    expectedFees,
  ])

  /**
   * TODO tính phí vận tải dựa vào khoảng cách
   */
  const calTransportFee = useCallback(() => {
    handleCalTransportFee({
      distance: totalDistance,
      vehicleCategoryId: delivery.selectedCar?.id!,
    })
  }, [delivery.selectedCar?.id, handleCalTransportFee, totalDistance])

  /**
   * TODO đẩy thông tin điểm lấy hàng vào order
   */
  const putDeliveryLocations = useCallback(() => {
    const orderLocationParams = {
      contact: delivery?.deliveryLocation?.contact,
      locationDetail: delivery?.deliveryLocation?.locationName,
      location: delivery?.deliveryLocation?.address,
      orderCode: propsCreateOrder.data?.data.code,
      phone: delivery.deliveryLocation?.numberPhoneContact,
      placeId: delivery.deliveryLocation?.placeId,
      status: StatusOrderE['Bản nháp'],
      latitude: delivery.deliveryLocation?.latitude,
      longitude: delivery.deliveryLocation?.longitude,
      note: delivery.deliveryLocation?.note ?? '',
      sort:
        typeof delivery.sortedList?.[0] !== 'undefined'
          ? delivery.sortedList?.[0] + 1
          : 1, // * sort tính từ 1
    }
    /**
     * * nếu orderLocations đã có sẵn trong order
     * * thì lấy ra thằng điểm lấy hàng để lấy ra id của nó , dùng để update location mới
     */
    if (propsGetOrderByCode?.currentData?.data?.length! > 0) {
      const deliveryLocation = propsGetOrderByCode.currentData?.data?.find(
        p => p.sort === 1,
      )
      if (deliveryLocation) {
        handleUpdateOrderLocation({
          ...orderLocationParams,
          locationId: deliveryLocation?.id!,
          type: LocationTypeE.DELIVERY,
          pickupType: delivery.isNow ? PickupTypeE.NOW : PickupTypeE.BOOKING,
          pickupDate: formatDeliveryDateTime(delivery.date ?? new Date()),
        })
      }
    } else {
      /**
       * * ngược lại với trên
       * TODO tạo mới order location
       */
      handleCreateOrderLocation({
        ...orderLocationParams,
        type: LocationTypeE.DELIVERY,
        pickupType: delivery.isNow ? PickupTypeE.NOW : PickupTypeE.BOOKING,
        pickupDate: formatDeliveryDateTime(delivery.date ?? new Date()),
      })
    }
  }, [
    delivery.date,
    delivery.deliveryLocation?.address,
    delivery.deliveryLocation?.contact,
    delivery.deliveryLocation?.latitude,
    delivery.deliveryLocation?.locationName,
    delivery.deliveryLocation?.longitude,
    delivery.deliveryLocation?.note,
    delivery.deliveryLocation?.numberPhoneContact,
    delivery.deliveryLocation?.placeId,
    delivery.isNow,
    delivery.sortedList,
    handleCreateOrderLocation,
    handleUpdateOrderLocation,
    propsCreateOrder.data?.data.code,
    propsGetOrderByCode.currentData?.data,
  ])

  /**
   * TODO đẩy thông tin điểm nhận hàng vào order
   */
  const putReceiveLocations = useCallback(() => {
    Object.keys(delivery.receiveLocations ?? {})?.map(index => {
      const orderLocationParams = {
        contact: delivery.receiveLocations?.[index]?.contact,
        locationDetail: delivery?.receiveLocations?.[index]?.locationName,
        location: delivery?.receiveLocations?.[index]?.address,
        orderCode: propsCreateOrder.data?.data.code,
        phone: delivery.receiveLocations?.[index]?.numberPhoneContact,
        placeId: delivery.receiveLocations?.[index]?.placeId,
        status: 0,
        latitude: delivery.receiveLocations?.[index]?.latitude,
        longitude: delivery.receiveLocations?.[index]?.longitude,
        note: delivery.receiveLocations?.[index]?.note,
        sort:
          typeof delivery.sortedList?.[+index] !== 'undefined'
            ? delivery.sortedList?.[+index] + 1
            : +index + 1, // * sort tính từ 1
      }
      /**
       * * nếu thằng nhận hàng ở vị trí đầu tiên trungf với điểm lấy hàng
       *  * thì ko tạo mới order location
       */
      if (index === '0') {
        if (
          delivery.receiveLocations?.[index]?.placeId ===
          delivery.deliveryLocation?.placeId
        ) {
          return
        }
      }
      /**
       * * nếu orderLocations đã có sẵn trong order
       * * thì lấy ra thằng điểm nhận hàng để lấy ra id của nó , dùng để update location mới,
       * * * hoặc nếu không có thì create location mới
       */
      if (propsGetOrderByCode?.currentData?.data?.length! > 0) {
        const updateLocation = propsGetOrderByCode?.currentData?.data.find(
          prop => prop.sort === +index + 1, // * trùng sort thì mới update
        )
        if (updateLocation) {
          handleUpdateOrderLocation({
            ...orderLocationParams,
            locationId: updateLocation?.id,
            type: LocationTypeE.RECEIVE,
          })
        } else {
          handleCreateOrderLocation({
            ...orderLocationParams,
            type: LocationTypeE.RECEIVE,
          })
        }
      }
      // TODO ngược lại nếu chọn thêm điểm mới thì tạo mới order location
      else {
        handleCreateOrderLocation({
          ...orderLocationParams,
          type: LocationTypeE.RECEIVE,
        })
      }
    })
  }, [
    delivery.deliveryLocation?.placeId,
    delivery.receiveLocations,
    delivery.sortedList,
    handleCreateOrderLocation,
    handleUpdateOrderLocation,
    propsCreateOrder.data?.data.code,
    propsGetOrderByCode?.currentData?.data,
  ])

  /**
   * TODO check nếu đã chọn loại xe địa điểm thì tính phí vận tải
   */
  useEffect(() => {
    if (delivery.selectedCar && distances.size) {
      calTransportFee()
    }
  }, [calTransportFee, delivery.selectedCar, distances.size])

  /**
   * TODO check nếu thay đổi phí vận chuyển hoặc phí dịch vụ thì tính lại phí
   */

  useEffect(() => {
    if (propsCalTransportFee.data?.data && delivery.selectedServices) {
      calFeeServices()
    }
  }, [
    propsCalTransportFee.data?.data,
    delivery.selectedServices,
    calFeeServices,
  ])

  /**
   * TODO: tính khoảng cách theo công thức
   * * ta có: location = [điểm 1, điểm 2, điểm 3, điểm 4....]
   * @param orgins: [điểm 1, điểm 2, điểm 3,....]
   * @param destination: [điểm 2, điểm 3, điểm 4,....]
   * * tính khoảng cách giữa 2 mảng (điểm 1 - điểm 2, điểm 3 - điểm 4, ....)
   * @param setDistances cuối cùng lấy ra mảng khoảng cách giữa các điểm
   */
  useEffect(() => {
    /**
     * * nếu receiveLocation có length >= 2 thì mới tính khoảng cách
     */
    const receiveLocationKeys = Object.keys(delivery.receiveLocations ?? {})
    if (
      receiveLocationKeys.length <= 1 ||
      receiveLocationKeys.includes('temp')
    ) {
      return
    }

    let orginLocation =
      receiveLocationKeys.slice(0, receiveLocationKeys.length - 1).map(key => {
        return delivery.receiveLocations?.[key]
      }) ?? []
    let destinationLocations =
      receiveLocationKeys.slice(1, receiveLocationKeys.length).map(key => {
        return delivery.receiveLocations?.[key]
      }) ?? []

    const latlogOrigin = orginLocation
      ?.map(location => `${location?.latitude} ${location?.longitude}`)
      .join('|')
    const latlogDestination = destinationLocations
      ?.map(location => `${location?.latitude} ${location?.longitude}`)
      .join('|')

    handleGetDistance({
      origin: latlogOrigin,
      destination: latlogDestination,
      callback(response) {
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: OrderProvider.tsx:491 ~ callback ~ response',
          response,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        const set = new Set<number>()
        receiveLocationKeys
          .slice(0, receiveLocationKeys.length - 1)
          .map(key => {
            set.add(response?.rows[+key]?.elements[+key]?.distance?.value)
          })
        setDistances(set)
      },
    })
  }, [delivery.receiveLocations, handleGetDistance])

  /**
   * TODO: chat with driver
   * * lấy ra thông tin tài xế bằng api
   * * lấy ra thông tin tài xế trên sendbird
   * * TODO: search channel = id guest và tài xế
   */
  const handleCreateChannelChat = useCallback(
    async (order: OrderT) => {
      const driver = await handleGetInfoDriver({
        driveId: order?.driverHandlingId,
      })

      const queryParams: ApplicationUserListQueryParams = {
        userIdsFilter: [`driver_${driver.data?.id}`],
      }
      const query = GetSendbirdSDK().createApplicationUserListQuery(queryParams)

      const [user] = await query.next()

      if (!user) {
        alertError('Tài xế này chưa tồn tại trên hệ thống!')
        return
      }

      const params: GroupChannelListQueryParams = {
        userIdsFilter: {
          userIds: [
            `${GetSendbirdSDK().currentUser?.userId}`,
            `driver_${driver.data?.id}`,
          ],
          includeMode: false,
          queryType: QueryType.AND,
        },
      }

      const queryChannel: GroupChannelListQuery =
        GetSendbirdSDK().groupChannel.createMyGroupChannelListQuery(params)

      let [channel] = await queryChannel.next()

      /**
       * TODO: nếu chưa có channel thì tạo channel mới
       */
      if (!channel) {
        const paramsChannel: GroupChannelCreateParams = {
          invitedUserIds: [`driver_${driver.data?.id}`],
          name: '',
          coverUrl: '',
          isDistinct: false,
          operatorUserIds: [GetSendbirdSDK().currentUser.userId],
        }

        channel = await GetSendbirdSDK().groupChannel.createChannel(
          paramsChannel,
        )
      }

      navigate('ChatScreen', {
        serializedChannel: channel?.serialize(),
        driverName: driver.data?.name,
      })
    },
    [handleGetInfoDriver],
  )

  const calling = useCallback(async (userId: string) => {
    try {
      const callProps = await SendbirdCalls.dial(userId, false)
      navigate('VoiceCalling', {
        callId: callProps.callId,
      })
    } catch (e) {
      // @ts-ignore
      Alert.alert('Failed', e.message)
    }
  }, [])

  /**
   * TODO: Gọi tài xế thông qua số điện thoại
   */
  const onCallDriver = useCallback(
    async (order: OrderT) => {
      try {
        const driveId = order?.driverHandlingId
        if (driveId) {
          loading.toogleLoading?.(true, 'orderitem')

          const driver = await handleGetInfoDriver({
            driveId,
          })

          await calling(`driver_${driver.data?.id}`)

          // if (driver) {
          //   Linking.openURL(`tel:${driver.data?.phone}`)
          // }
        }
      } catch (error) {
      } finally {
        loading.toogleLoading?.(false, 'orderitem')
      }
    },
    [calling, handleGetInfoDriver, loading],
  )

  const reset = useCallback(() => {
    setExpectedFees(undefined)
    setDistances(new Set<number>())
    resetFitments()
  }, [resetFitments])

  const contextValue = useMemo<Partial<OrderContextType>>(
    () => ({
      putServicesForOrder: putServices,
      putPickupDateForOrder: putPickupDate,
      putFeeAndDistanceForOrder: putFeeAndDistance,
      callFeeServicesOfOrder: calFeeServices,
      callTransportFeeOfOrder: calTransportFee,
      putDeliveryLocationsForOrder: putDeliveryLocations,
      putReceiveLocationsForOrder: putReceiveLocations,
      deliveryFee,
      feeService,
      totalDistance,
      propsCalExpectedFeeOfOrder: propsCalExpectedFee,
      propsCalTransportFeeOfOrder: propsCalTransportFee,
      propsCreateOrderLocationOfOrder: propsCreateOrderLocation,
      propsUpdateOrderLocationOfOrder: propsUpdateOrderLocation,
      propsChoiceServiceOfOrder: propsChoiceService,
      distances,
      setExpectedFees,
      reset: reset,
      putFitments,
      putFeeAndDistanceAdvised,
      onCallDriver,
      handleCreateChannelChat,
    }),
    [
      putServices,
      putPickupDate,
      putFeeAndDistance,
      calFeeServices,
      calTransportFee,
      putDeliveryLocations,
      putReceiveLocations,
      deliveryFee,
      feeService,
      totalDistance,
      propsCalExpectedFee,
      propsCalTransportFee,
      propsCreateOrderLocation,
      propsUpdateOrderLocation,
      propsChoiceService,
      distances,
      reset,
      putFitments,
      putFeeAndDistanceAdvised,
      onCallDriver,
      handleCreateChannelChat,
    ],
  )

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  )
}
