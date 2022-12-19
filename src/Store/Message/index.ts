import { createSlice } from '@reduxjs/toolkit'
import { DeviceState, OSNotification } from 'react-native-onesignal'

const initialState = {} as Partial<MessageState>

const slice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    setReceivedNotification: (
      state,
      { payload: { notificationPusherData } }: MessagePayload,
    ) => {
      state.notificationPusherData = notificationPusherData
    },
    setDeviceState: (state, { payload: { deviceState } }: MessagePayload) => {
      if (typeof deviceState !== 'undefined') {
        state.deviceState = deviceState
      }
    },
  },
})

export const { setReceivedNotification, setDeviceState } = slice.actions

export default slice.reducer

export type MessagePayload = {
  payload: Partial<MessageState>
}

export type MessageState = {
  notificationPusherData: OSNotification
  deviceState: DeviceState
}
