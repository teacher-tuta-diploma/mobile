import Container from '@/Components/Container'
import DriverReceive from '@/Components/DriverReceive'
import { navigateOrder } from '@/Config/api.helper'
import { useTheme } from '@/Hooks'
import { useAppDispatch } from '@/Hooks/useApp'
import usePopupGlobal from '@/Hooks/usePopup'
import { navigate } from '@/Navigators/utils'
import { useLazyHandleGetOrderDetailQuery } from '@/Services/modules/users'
import { setDeviceState, setReceivedNotification } from '@/Store/Message'
import { NotificationDataT } from '@/Store/Message/type'
import React, { useCallback, useEffect, useRef } from 'react'
import Config from 'react-native-config'
import OneSignal from 'react-native-onesignal'

export type NetworkT = {}

export const NetworkContext = React.createContext<NetworkT>({})

const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const { MetricsSizes, Colors } = useTheme()
  const popup = usePopupGlobal()
  const [handleGetOrderDetail] = useLazyHandleGetOrderDetailQuery()
  const isShowPopup = useRef<boolean>(true)
  /**
   * TODO show pop up tài xế
   */
  const onShowPopup = useCallback(() => {
    isShowPopup.current = false
    popup?.showPopup?.(
      <Container
        as="center"
        bg={Colors.white}
        br={MetricsSizes.tiny}
        position="absolute"
        top={MetricsSizes.large * 2}
      >
        <DriverReceive
          onClose={(bool: boolean) => {
            popup.tooglePopup?.(bool)
            isShowPopup.current = true
          }}
        />
      </Container>,
    )
  }, [Colors.white, MetricsSizes.large, MetricsSizes.tiny, popup])

  useEffect(() => {
    OneSignal.setAppId(Config.ONE_SIGNAL_APPID)
    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse()

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        )
        let notification = notificationReceivedEvent.getNotification()
        console.log('notification: ', notification)
        const data = JSON.parse(
          (notification.additionalData as any)?.data,
        ) as NotificationDataT
        console.log('additionalData: ', data)
        /**
         * TODO đẩy noti vừa nhận được vào store
         */
        dispatch(
          setReceivedNotification({
            notificationPusherData: notification,
          }),
        )
        if (data.params?.paymentVnpay) {
          return
        }

        /**
         * TODO nếu có code mới show thông tin tài xế
         */
        if (data.params?.code && isShowPopup.current) {
          onShowPopup()
        }

        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification)
      },
    )

    OneSignal.addPermissionObserver(event => {
      console.log('OneSignal: permission changed:', event)
    })

    OneSignal.addSubscriptionObserver(event => {
      console.log('OneSignal: subscription changed:', event)
    })

    OneSignal.addEmailSubscriptionObserver(event => {
      console.log('OneSignal: email subscription changed: ', event)
    })

    OneSignal.setNotificationOpenedHandler(async openedEvent => {
      console.log('OneSignal: notification opened:', openedEvent)
      /**
       * TODO: lấy ra data từ notification
       * * lấy ra orderdetail từ order code
       */
      try {
        const { notification: noti } = openedEvent
        const data = JSON.parse(
          (noti.additionalData as any)?.data,
        ) as NotificationDataT
        console.log('additionalData: ', data)
        const orderCode = data.params?.code
        const orderDetail = await handleGetOrderDetail({
          orderCode,
        })

        navigateOrder(orderDetail.data?.data!, navigate)
      } catch (error) {
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: NetworkProvider.tsx ~ line 106 ~ useEffect ~ error',
          error,
        )
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      }
    })
    ;(async () => {
      // OneSignal React Native SDK 4.x.x+
      const deviceState = await OneSignal.getDeviceState()

      deviceState &&
        dispatch(
          setDeviceState({
            deviceState,
          }),
        )
      if (deviceState?.isSubscribed === false) {
        OneSignal.addTrigger('prompt_ios', 'true')
      }
    })()
    return () => {}
  }, [dispatch, handleGetOrderDetail, onShowPopup])

  return (
    <NetworkContext.Provider value={{}}>{children}</NetworkContext.Provider>
  )
}

export default NetworkProvider
