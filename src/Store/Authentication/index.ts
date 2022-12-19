import { createSlice } from '@reduxjs/toolkit'
import { AccountT, CredentailT } from './types'

const initialState = {
  accessToken: '',
} as AuthenticationState

const slice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, { payload: { accessToken } }: AuthPayload) => {
      if (typeof accessToken !== 'undefined') {
        state.accessToken = accessToken
      }
    },
    setAccount: (state, { payload: { account } }: AuthPayload) => {
      if (typeof account !== 'undefined') {
        state.account = account
      }
    },
    setCredential: (state, { payload: { credential } }: AuthPayload) => {
      if (typeof credential !== 'undefined') {
        state.credential = credential
      }
    },
    reset: () => initialState,
  },
})

export const { setAccessToken, setAccount, setCredential, reset } =
  slice.actions

export default slice.reducer

export type AuthenticationState = {
  accessToken: string
  account: AccountT
  credential: CredentailT
}

export type AuthPayload = {
  payload: Partial<AuthenticationState>
}
