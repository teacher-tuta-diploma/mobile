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
   * TODO t??nh t???ng qu??ng ???????ng ??i
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
   * TODO: t??nh t???ng ph?? d???ch v???
   */
  const feeService = useMemo(() => {
    const expectedFee = propsCalExpectedFee.data?.data.reduce(
      (sum, fee) => (fee.key === FeeE.PROMO ? sum : sum + fee.price),
      0,
    )
    return expectedFee ?? 0
  }, [propsCalExpectedFee.data?.data])

  /**
   * TODO: t??nh t???ng ph?? ph????ng ti???n v???n chuy???n v?? ph?? d???ch v???
   */
  const deliveryFee = useMemo(() => {
    return propsCalTransportFee.data?.data ?? 0
  }, [propsCalTransportFee.data?.data])

  const [, propsCreateOrder] = useHandleCreateOrderMutation({
    fixedCacheKey: 'createOrders',
  })
  /**
   * TODO GET order location ???? c?? trong order
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
   * TODO l???y th??ng tin t??i x???
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
   * TODO c???p nh???t d???ch v??? ???????c ch???n cho order
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
   * TODO c???p nh???t th???i gian v?? ki???u th???i gian giao
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
   * TODO truy???n l??n order kho???ng c??ch v?? gi?? ti???n t??nh ???????c
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
   * TODO truy???n l??n order kho???ng c??ch v?? reset gi?? khi ch???n t?? v???n kh???o s??t
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
   * TODO: g???i api t??nh c??c lo???i ph?? v?? ph?? v???n chuy???n
   * * ph?? v???n chuy???n l???y kho???ng c??ch ????? t??nh ra gi??
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
   * TODO t??nh ph?? v???n t???i d???a v??o kho???ng c??ch
   */
  const calTransportFee = useCallback(() => {
    handleCalTransportFee({
      distance: totalDistance,
      vehicleCategoryId: delivery.selectedCar?.id!,
    })
  }, [delivery.selectedCar?.id, handleCalTransportFee, totalDistance])

  /**
   * TODO ?????y th??ng tin ??i???m l???y h??ng v??o order
   */
  const putDeliveryLocations = useCallback(() => {
    const orderLocationParams = {
      contact: delivery?.deliveryLocation?.contact,
      locationDetail: delivery?.deliveryLocation?.locationName,
      location: delivery?.deliveryLocation?.address,
      orderCode: propsCreateOrder.data?.data.code,
      phone: delivery.deliveryLocation?.numberPhoneContact,
      placeId: delivery.deliveryLocation?.placeId,
      status: StatusOrderE['B???n nh??p'],
      latitude: delivery.deliveryLocation?.latitude,
      longitude: delivery.deliveryLocation?.longitude,
      note: delivery.deliveryLocation?.note ?? '',
      sort:
        typeof delivery.sortedList?.[0] !== 'undefined'
          ? delivery.sortedList?.[0] + 1
          : 1, // * sort t??nh t??? 1
    }
    /**
     * * n???u orderLocations ???? c?? s???n trong order
     * * th?? l???y ra th???ng ??i???m l???y h??ng ????? l???y ra id c???a n?? , d??ng ????? update location m???i
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
       * * ng?????c l???i v???i tr??n
       * TODO t???o m???i order location
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
   * TODO ?????y th??ng tin ??i???m nh???n h??ng v??o order
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
            : +index + 1, // * sort t??nh t??? 1
      }
      /**
       * * n???u th???ng nh???n h??ng ??? v??? tr?? ?????u ti??n trungf v???i ??i???m l???y h??ng
       *  * th?? ko t???o m???i order location
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
       * * n???u orderLocations ???? c?? s???n trong order
       * * th?? l???y ra th???ng ??i???m nh???n h??ng ????? l???y ra id c???a n?? , d??ng ????? update location m???i,
       * * * ho???c n???u kh??ng c?? th?? create location m???i
       */
      if (propsGetOrderByCode?.currentData?.data?.length! > 0) {
        const updateLocation = propsGetOrderByCode?.currentData?.data.find(
          prop => prop.sort === +index + 1, // * tr??ng sort th?? m???i update
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
      // TODO ng?????c l???i n???u ch???n th??m ??i???m m???i th?? t???o m???i order location
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
   * TODO check n???u ???? ch???n lo???i xe ?????a ??i???m th?? t??nh ph?? v???n t???i
   */
  useEffect(() => {
    if (delivery.selectedCar && distances.size) {
      calTransportFee()
    }
  }, [calTransportFee, delivery.selectedCar, distances.size])

  /**
   * TODO check n???u thay ?????i ph?? v???n chuy???n ho???c ph?? d???ch v??? th?? t??nh l???i ph??
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
   * TODO: t??nh kho???ng c??ch theo c??ng th???c
   * * ta c??: location = [??i???m 1, ??i???m 2, ??i???m 3, ??i???m 4....]
   * @param orgins: [??i???m 1, ??i???m 2, ??i???m 3,....]
   * @param destination: [??i???m 2, ??i???m 3, ??i???m 4,....]
   * * t??nh kho???ng c??ch gi???a 2 m???ng (??i???m 1 - ??i???m 2, ??i???m 3 - ??i???m 4, ....)
   * @param setDistances cu???i c??ng l???y ra m???ng kho???ng c??ch gi???a c??c ??i???m
   */
  useEffect(() => {
    /**
     * * n???u receiveLocation c?? length >= 2 th?? m???i t??nh kho???ng c??ch
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
          '???? LOG: ???? --> ----------------------------------------------------------------------------???? LOG: ???? -->',
        )
        console.log(
          '???? LOG: ???? --> ~ file: OrderProvider.tsx:491 ~ callback ~ response',
          response,
        )
        console.log(
          '???? LOG: ???? --> ----------------------------------------------------------------------------???? LOG: ???? -->',
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
   * * l???y ra th??ng tin t??i x??? b???ng api
   * * l???y ra th??ng tin t??i x??? tr??n sendbird
   * * TODO: search channel = id guest v?? t??i x???
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
        alertError('T??i x??? n??y ch??a t???n t???i tr??n h??? th???ng!')
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
       * TODO: n???u ch??a c?? channel th?? t???o channel m???i
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
   * TODO: G???i t??i x??? th??ng qua s??? ??i???n tho???i
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
