import React, { useEffect, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ClipboardService,
  FileService,
  MediaService,
  NotificationService,
  SetSendbirdSDK,
} from '@/Hooks/useSendBird'
import { SendbirdUIKitContainer } from '@/Containers/ChatSendBird/Uikit'
import {
  onForegroundAndroid,
  onForegroundIOS,
} from '@/Containers/ChatSendBird/Uikit/libs/notification'
import { MyCustomDarkTheme } from '@/Theme/themes/sendbird_theme'
import Config from 'react-native-config'

export const ChatContext = React.createContext<any>({})

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const contextValue = useMemo(() => {}, [])

  useEffect(() => {
    const unsubscribes = [onForegroundIOS(), onForegroundAndroid()]
    return () => {
      unsubscribes.forEach(fn => fn())
    }
  }, [])
  return (
    <ChatContext.Provider value={contextValue}>
      <SendbirdUIKitContainer
        appId={Config.SENDBIRD_APPID}
        chatOptions={{
          localCacheStorage: AsyncStorage,
          enableAutoPushTokenRegistration: true,
          enableChannelListTypingIndicator: true,
          enableChannelListMessageReceiptStatus: true,
          onInitialized: SetSendbirdSDK,
        }}
        styles={{
          theme: MyCustomDarkTheme(),
        }}
        platformServices={{
          file: FileService,
          notification: NotificationService,
          clipboard: ClipboardService,
          media: MediaService,
        }}
      >
        {/* Rest of your app */}
        {children}
      </SendbirdUIKitContainer>
    </ChatContext.Provider>
  )
}
