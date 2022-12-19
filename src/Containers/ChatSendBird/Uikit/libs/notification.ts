// import Notifee, { EventType } from '@notifee/react-native'
// import type { Event } from '@notifee/react-native/dist/types/Notification'
import PushNotificationIOS, {
  PushNotification,
} from '@react-native-community/push-notification-ios'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
import Notifee from '@notifee/react-native'

import {
  NOOP,
  isSendbirdNotification,
  SendbirdChatSDK,
  parseSendbirdNotification,
} from '@sendbird/uikit-utils'
import { navigate, runAfterAppReady } from '@/Navigators/utils'
import { BaseMessage, Sender, UserMessage } from '@sendbird/chat/message'
import { BaseChannel } from '@sendbird/chat'
import { alertError } from '@/Config/alert.helper'
import notifee from '@notifee/react-native'
import { GetSendbirdSDK } from '@/Hooks/useSendBird'

const channelId = 'default'
// Notifee.createChannel({ id: channelId, name: 'Default Channel', importance: 4 })

export const onNotificationAndroid: (event: Event) => Promise<void> = async ({
  type,
  detail,
}) => {
  if (Platform.OS !== 'android') {
    return
  }

  if (
    // type === EventType.PRESS &&
    detail.notification &&
    isSendbirdNotification(detail.notification.data)
  ) {
    const sendbird = parseSendbirdNotification(detail.notification.data)
    runAfterAppReady(async (sdk, actions) => {
      // if (Routes.Home === navigationRef.getCurrentRoute()?.name) {
      //   actions.push(Routes.GroupChannelTabs, undefined)
      // }
      // const channel = await sdk.groupChannel.getChannel(
      //   sendbird.channel.channel_url,
      // )
      // actions.navigate(Routes.GroupChannel, {
      //   serializedChannel: channel.serialize(),
      // })
    })
  }
}

export const onForegroundAndroid = () =>
  Notifee.onForegroundEvent(onNotificationAndroid)

export const onForegroundIOS = () => {
  if (Platform.OS !== 'ios') {
    return NOOP
  }
  notifee.onForegroundEvent(async props => {
    const sdk = GetSendbirdSDK()

    const sendbird = parseSendbirdNotification(
      props.detail.notification?.data as any,
    )

    const channel = await sdk.groupChannel.getChannel(
      sendbird.channel.channel_url,
    )
    navigate('ChatScreen', {
      serializedChannel: channel.serialize(),
    })
  })
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      '🛠 LOG: 🚀 --> -------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    console.log(
      '🛠 LOG: 🚀 --> ~ file: notification.ts ~ line 89 ~ messaging ~ remoteMessage',
      remoteMessage,
    )
    console.log(
      '🛠 LOG: 🚀 --> -------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
  })
  const onNotificationIOS = (notification: PushNotification) => {
    const data = notification.getData()
    console.log(
      '🛠 LOG: 🚀 --> -------------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    console.log(
      '🛠 LOG: 🚀 --> ~ file: notification.ts ~ line 57 ~ onNotificationIOS ~ notification',
      notification,
      data,
    )
    console.log(
      '🛠 LOG: 🚀 --> -------------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )

    if (data.userInteraction === 1 && isSendbirdNotification(data)) {
      const sendbird = parseSendbirdNotification(data)
      console.log(
        '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      console.log(
        '🛠 LOG: 🚀 --> ~ file: notification.ts ~ line 61 ~ onNotificationIOS ~ sendbird',
        sendbird,
      )
      console.log(
        '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      runAfterAppReady(async (sdk, actions) => {})
    }
  }

  const checkAppOpenedWithNotification = async () => {
    const notification = await PushNotificationIOS.getInitialNotification()

    notification && onNotificationIOS(notification)
  }

  checkAppOpenedWithNotification()
  PushNotificationIOS.addEventListener('notification', onNotificationIOS)
  PushNotificationIOS.addEventListener('localNotification', onNotificationIOS)
  return () => PushNotificationIOS.removeEventListener('localNotification')
}

messaging().setBackgroundMessageHandler(
  async (message: FirebaseMessagingTypes.RemoteMessage) => {
    if (Platform.OS !== 'android') {
      return
    }

    if (isSendbirdNotification(message.data)) {
      const sendbird = parseSendbirdNotification(message.data)
      console.log(
        '🛠 LOG: 🚀 --> ---------------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      console.log(
        '🛠 LOG: 🚀 --> ~ file: notification.ts ~ line 94 ~ sendbird',
        sendbird,
      )
      console.log(
        '🛠 LOG: 🚀 --> ---------------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      await Notifee.displayNotification({
        id: String(sendbird.message_id),
        title: `[RN]${
          sendbird.channel.name || sendbird.sender?.name || 'Message received'
        }`,
        body: sendbird.message,
        data: message.data,
        android: {
          channelId,
          importance: 4,
          // smallIcon: 'drawable/icon_push_lollipop',
          largeIcon:
            sendbird.sender?.profile_url || sendbird.channel.channel_url,
          circularLargeIcon: true,
          pressAction: { id: 'default' },
          showTimestamp: true,
          timestamp: sendbird.created_at,
        },
        ios: {
          threadId: sendbird.channel.channel_url,
        },
      })
    }
  },
)

export async function onDisplayNotification(
  message: Partial<BaseMessage & UserMessage>,
  eventChannel: BaseChannel,
) {
  await Notifee.displayNotification({
    id: String(message.messageId),
    title: `[RN]${
      eventChannel.name ||
      (message.sender as Sender).nickname ||
      'Message received'
    }`,
    body: message.message,
    android: {
      channelId,
      importance: 4,
      // smallIcon: 'drawable/icon_push_lollipop',
      largeIcon: (message.sender as Sender).profileUrl,
      circularLargeIcon: true,
      pressAction: { id: 'default' },
      showTimestamp: true,
      timestamp: message.createdAt,
    },
    ios: {
      threadId: eventChannel.url,
      badgeCount: 1,
      sound: 'default',
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  })
}
