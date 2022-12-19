import React, { useCallback, useEffect, useMemo } from 'react'
import {
  AuthProvider,
  useAuthContext,
} from '@/Containers/CallSendBird/contexts/AuthContext'
import { SendbirdCalls, SoundType } from '@sendbird/calls-react-native'
import Config from 'react-native-config'
import { Platform } from 'react-native'
import {
  setFirebaseMessageHandlers,
  setNotificationForegroundService,
  startRingingWithNotification,
} from '@/Containers/CallSendBird/callHandler/android'
import {
  setupCallKit,
  startRingingWithCallKit,
} from '@/Containers/CallSendBird/callHandler/ios'
import AuthManager, {
  Credential,
} from '@/Containers/CallSendBird/libs/AuthManager'
import CallHistoryManager from '@/Containers/CallSendBird/libs/CallHistoryManager'
import { AppLogger } from '@/Containers/CallSendBird/utils/logger'
import {
  CALL_PERMISSIONS,
  usePermissions,
} from '@/Containers/CallSendBird/hooks/usePermissions'
import { useLayoutEffectAsync } from '@/Containers/CallSendBird/hooks/useEffectAsync'
import TokenManager from '@/Containers/CallSendBird/libs/TokenManager'
import RNVoipPushNotification from 'react-native-voip-push-notification'
import messaging from '@react-native-firebase/messaging'

export type CallContextT = {
  onSigin?: (value: Credential) => void
  unregisterToken: () => void
  deauthenticate: () => void
}
export const CallContext = React.createContext<Partial<CallContextT>>({})

export const CallProvider = ({ children }: { children: React.ReactNode }) => {
  usePermissions(CALL_PERMISSIONS)
  const { setCurrentUser } = useAuthContext()

  const registerToken = async () => {
    if (Platform.OS === 'android') {
      const token = await messaging().getToken()
      await Promise.all([
        SendbirdCalls.registerPushToken(token, true),
        TokenManager.set({ value: token, type: 'fcm' }),
      ])
      AppLogger.info('registered token:', TokenManager.token)
    }

    if (Platform.OS === 'ios') {
      RNVoipPushNotification.addEventListener('register', async voipToken => {
        await Promise.all([
          SendbirdCalls.ios_registerVoIPPushToken(voipToken, true),
          TokenManager.set({ value: voipToken, type: 'voip' }),
        ])
        RNVoipPushNotification.removeEventListener('register')
        AppLogger.info('registered token:', TokenManager.token)
      })
      RNVoipPushNotification.registerVoipToken()
    }
  }

  const authenticate = async (value: Credential) => {
    const user = await SendbirdCalls.authenticate(value)
    await AuthManager.authenticate(value)

    AppLogger.info('sendbird user:', user)
    return user
  }

  const unregisterToken = async () => {
    const token = await TokenManager.get()
    if (token) {
      switch (token.type) {
        case 'apns':
        case 'fcm': {
          await SendbirdCalls.unregisterPushToken(token.value)
          break
        }
        case 'voip': {
          await SendbirdCalls.ios_unregisterVoIPPushToken(token.value)
          break
        }
      }
      await TokenManager.set(null)
    }
  }

  const deauthenticate = useCallback(async () => {
    await Promise.all([
      AuthManager.deAuthenticate(),
      SendbirdCalls.deauthenticate(),
    ])
    setCurrentUser(undefined)
  }, [setCurrentUser])

  const onSignIn = useCallback(
    async (value: Credential) => {
      try {
        const user = await authenticate(value)
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: DirectCallSignInScreen.tsx:70 ~ onSignIn ~ user',
          user,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        setCurrentUser(user)
        await registerToken()
      } catch (error) {
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: DirectCallSignInScreen.tsx:70 ~ onSignIn ~ error',
          error,
        )
        console.log(
          '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      }
    },
    [setCurrentUser],
  )

  useLayoutEffectAsync(async () => {
    const credential = await AuthManager.getSavedCredential()
    if (credential) {
      onSignIn(credential)
    }
  }, [])

  useEffect(() => {
    SendbirdCalls.initialize(Config.SENDBIRD_APPID)
    if (Platform.OS === 'android') {
      SendbirdCalls.addDirectCallSound(SoundType.RINGING, 'ringing.mp3')
    }
    SendbirdCalls.addDirectCallSound(SoundType.DIALING, 'dialing.mp3')
    SendbirdCalls.addDirectCallSound(SoundType.RECONNECTED, 'reconnected.mp3')
    SendbirdCalls.addDirectCallSound(SoundType.RECONNECTING, 'reconnecting.mp3')
    SendbirdCalls.setDirectCallDialingSoundOnWhenSilentOrVibrateMode(true)

    // Setup android message & notification handlers
    if (Platform.OS === 'android') {
      setFirebaseMessageHandlers()
      setNotificationForegroundService()
    }

    // Setup ios callkit
    if (Platform.OS === 'ios') {
      setupCallKit()
    }

    // Setup onRinging
    SendbirdCalls.setListener({
      onRinging: async call => {
        const directCall = await SendbirdCalls.getDirectCall(call.callId)

        if (!SendbirdCalls.currentUser) {
          const credential = await AuthManager.getSavedCredential()

          if (credential) {
            // Authenticate before accept
            await SendbirdCalls.authenticate(credential)
          } else {
            // Invalid user call
            return directCall.end()
          }
        }

        const unsubscribe = directCall.addListener({
          onEnded({ callId, callLog }) {
            AppLogger.info('[onRinging/onEnded] add to call history manager')
            callLog && CallHistoryManager.add(callId, callLog)
            unsubscribe()
          },
        })

        // Show interaction UI (Accept/Decline)
        if (Platform.OS === 'android') {
          await startRingingWithNotification(call)
        }
        if (Platform.OS === 'ios') {
          await startRingingWithCallKit(call)
        }
      },
    })
    return () => {}
  }, [])
  const contextValue = useMemo<CallContextT>(
    () => ({
      onSigin: onSignIn,
      unregisterToken,
      deauthenticate,
    }),
    [deauthenticate, onSignIn],
  )

  return (
    <AuthProvider>
      <CallContext.Provider value={contextValue}>
        {children}
      </CallContext.Provider>
    </AuthProvider>
  )
}
