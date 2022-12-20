import { createSlice } from '@reduxjs/toolkit'
import { DeliveryState } from '../Delivery'

const initialState = {
  isStart: true,
} as Partial<GlobalState>

const slice = createSlice({
  name: 'delivery',
  initialState: initialState,
  reducers: {
    setCloneTaxi: (state, { payload: { cloneTaxiState } }: GlobalPayload) => {
      if (typeof cloneTaxiState !== 'undefined') {
        state.cloneTaxiState = cloneTaxiState
      }
    },
    setCloneHome: (state, { payload: { cloneHomeState } }: GlobalPayload) => {
      if (typeof cloneHomeState !== 'undefined') {
        state.cloneHomeState = cloneHomeState
      }
    },
    setMessageError: (state, { payload: { messageError } }: GlobalPayload) => {
      if (typeof messageError !== 'undefined') {
        state.messageError = messageError
      }
    },
    setIsStart: (state, { payload: { isStart } }: GlobalPayload) => {
      if (typeof isStart !== 'undefined') {
        state.isStart = isStart
      }
    },
  },
})

export const { setCloneTaxi, setCloneHome, setMessageError, setIsStart } =
  slice.actions

export default slice.reducer

export type GlobalPayload = {
  payload: Partial<GlobalState>
}

export type GlobalState = {
  cloneTaxiState: Partial<DeliveryState>
  cloneHomeState: Partial<DeliveryState>
  messageError: {
    message: string
    status: number
  }
  isStart: boolean
}
