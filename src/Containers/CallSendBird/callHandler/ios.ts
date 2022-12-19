import RNCallKeep from 'react-native-callkeep'

import {
  DirectCallProperties,
  SendbirdCalls,
} from '@sendbird/calls-react-native'

import { DirectRouteWithParams, DirectRoutes } from '../navigations/routes'
import { AppLogger } from '../utils/logger'
import { navigate, RunAfterAppReady } from '@/Navigators/utils'

export const setupCallKit = async () => {
  await RNCallKeep.setup({
    ios: {
      appName: 'Thành Hưng Group',
      supportsVideo: true,
      maximumCallGroups: '1',
      maximumCallsPerCallGroup: '1',
      includesCallsInRecents: true,
      ringtoneSound: 'ringing.mp3',
    },
    android: {
      alertTitle: 'noop',
      alertDescription: 'noop',
      cancelButton: 'noop',
      okButton: 'noop',
      additionalPermissions: [],
    },
  })
}

// You can set CallKit listener on app mount with `setupCallKit`
// but it leads some weird behavior like listener is not triggered after app refresh on development mode.
export const setupCallKitListeners = () => {
  RNCallKeep.addEventListener('answerCall', async ({ callUUID }) => {
    const directCall = await SendbirdCalls.getDirectCall(callUUID)
    AppLogger.info('[CALL START]', directCall.callId)
    RunAfterAppReady<DirectRoutes, DirectRouteWithParams>(_ => {
      if (directCall.isVideoCall) {
        navigate('VideoCalling', {
          callId: directCall.callId,
        })
      } else {
        navigate('VoiceCalling', {
          callId: directCall.callId,
        })
      }
      directCall.accept()
    })
  })

  RNCallKeep.addEventListener('endCall', async ({ callUUID }) => {
    const directCall = await SendbirdCalls.getDirectCall(callUUID)
    AppLogger.info('[CALL END]', directCall.callId)
    await directCall.end()
  })

  return () => {
    RNCallKeep.removeEventListener('answerCall')
    RNCallKeep.removeEventListener('endCall')
  }
}

export const startRingingWithCallKit = async (props: DirectCallProperties) => {
  if (props.remoteUser && props.ios_callUUID) {
    AppLogger.info('[startRingingWithCallKit] Report incoming call')
    const uuid = props.ios_callUUID
    const remoteUser = props.remoteUser
    const directCall = await SendbirdCalls.getDirectCall(props.callId)

    const unsubscribeCallKit = setupCallKitListeners()
    const unsubscribeDirectCall = directCall.addListener({
      onEnded({ callLog }) {
        AppLogger.info('[startRingingWithCallKit]', 'onEnded')
        RNCallKeep.endAllCalls()
        if (callLog?.endedBy?.userId === remoteUser.userId) {
          RNCallKeep.reportEndCallWithUUID(uuid, 2)
        }
        unsubscribeDirectCall()
        unsubscribeCallKit()
      },
    })

    // Accept only one ongoing call
    const onGoingCalls = await SendbirdCalls.getOngoingCalls()
    if (onGoingCalls.length > 1 || directCall.isEnded) {
      AppLogger.warn(
        '[startRingingWithCallKit] Ongoing calls:',
        onGoingCalls.length,
      )
      directCall.end()
      RNCallKeep.rejectCall(uuid)
      return
    }

    RNCallKeep.displayIncomingCall(
      uuid,
      remoteUser.userId,
      remoteUser.nickname ?? 'Unknown',
      'generic',
      props.isVideoCall,
    )
  }
}
