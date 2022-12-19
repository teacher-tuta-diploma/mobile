import { STATUS_API } from '@/Services/api'
import {
  setAccessToken,
  setAccount,
  setCredential,
} from '@/Store/Authentication'
import {
  AuthenticationT,
  ForgotPasswordT,
  VerifyOtpT,
} from '@/Store/Authentication/types'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const handleLogin = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    AuthenticationT & {
      error: {
        message: string
      }
    },
    { phone: string; password: string; callback?: () => void }
  >({
    query: ({ ...post }) => ({
      url: '/guest/login',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    invalidatesTags: ['login'],
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`

    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled

        dispatch(
          setAccessToken({
            accessToken: data?.accessToken,
          }),
        )
        dispatch(
          setAccount({
            account: data?.account,
          }),
        )
      } catch {
      } finally {
        args.callback?.()
      }
    },
  })

export const handleLoginSocial = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    AuthenticationT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    { key: string; provider: string; callback?: () => void }
  >({
    query: ({ ...post }) => ({
      url: '/guest/social/login',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()
      return response
    },
    async onQueryStarted({}, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled

        if (!data.error) {
          dispatch(
            setAccessToken({
              accessToken: data?.accessToken,
            }),
          )
          dispatch(
            setAccount({
              account: data?.account,
            }),
          )
        }
      } catch {}
    },
  })

export const handleRegisterSocial = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    AuthenticationT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    {
      provider: string
      key: string
      phone: string
      name: string
      email: string
      address: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/social/register',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()
      return response
    },
    async onQueryStarted(params, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        dispatch(
          setAccessToken({
            accessToken: data?.accessToken,
          }),
        )
        dispatch(
          setAccount({
            account: data.account,
          }),
        )
      } catch {
      } finally {
        params.callback?.()
      }
    },
  })
export const handleRegisterUser = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    AuthenticationT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    {
      phone: string
      name: string
      email: string
      address: string
      password: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/register',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()

      return response
    },
    async onQueryStarted(params, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        dispatch(
          setAccount({
            account: data.account,
          }),
        )
        dispatch(
          setCredential({
            credential: data.credentail,
          }),
        )
      } catch {
      } finally {
        params.callback?.()
      }
    },
  })

export const handleVerifyOtp = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    VerifyOtpT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    {
      phone: string
      code: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/verify-otp',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()

      return response
    },
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: authentication.ts ~ line 217 ~ onQueryStarted ~ data',
          data,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch {}
    },
  })

export const handleResendVerifyOtp = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    VerifyOtpT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    {
      phone: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/resend-otp',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()

      return response
    },
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: authentication.ts ~ line 217 ~ onQueryStarted ~ data',
          data,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch {}
    },
  })

export const handleChangePhoneOtp = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    VerifyOtpT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    {
      phone: string
      id: number
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/change-phone',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()

      return response
    },
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: authentication.ts ~ line 217 ~ onQueryStarted ~ data',
          data,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch {}
    },
  })

export const handleActiveUser = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    AuthenticationT & {
      error?: {
        data: {
          error: {
            message: string
          }
        }
        status: STATUS_API
      }
    },
    {
      credentialId: number
      activeCode: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/active',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()

      return response
    },
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: authentication.ts ~ line 217 ~ onQueryStarted ~ data',
          data,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch {}
    },
  })

export const handleForgotPassword = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    ForgotPasswordT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    {
      phone: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/forgot',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()

      return response
    },
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: authentication.ts ~ line 217 ~ onQueryStarted ~ data',
          data,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch {}
    },
  })

export const handleSetNewPassword = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    ForgotPasswordT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    {
      password: string
      recoveryId: number
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/change-password',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()

      return response
    },
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: authentication.ts ~ line 217 ~ onQueryStarted ~ data',
          data,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch {}
    },
  })

export const handleSetPlayerId = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    ForgotPasswordT & {
      error?: {
        message: string
        status: STATUS_API
      }
    },
    {
      player_id: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/update-player-id',
      method: 'PUT',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()

      return response
    },
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: authentication.ts ~ line 217 ~ onQueryStarted ~ data',
          data,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch {}
    },
  })
