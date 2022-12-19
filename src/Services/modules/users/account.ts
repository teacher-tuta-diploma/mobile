import { apiAccount, STATUS_API } from '@/Services/api'
import { AccountT, ChangePasswordT } from '@/Store/Authentication/types'
import { OrderVehicleCategoryT } from '@/Store/Delivery/type'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import _ from 'lodash'

export const handleUpdateInfo = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { updated: AccountT } & {
      status: string
    },
    {
      email?: string
      name?: string
      address?: string
      dob?: string
      cccd?: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/me',
      method: 'PUT',
      body: _.pickBy(post, _.identity),
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`
    async onQueryStarted({}, { dispatch, queryFulfilled }) {
      try {
        const { data: updatedPost } = await queryFulfilled

        dispatch(
          apiAccount.util.updateQueryData(
            'handleGetInfo' as never,
            undefined as never,
            draft => {
              Object.assign(draft, updatedPost.updated)
            },
          ),
        )
      } catch (e) {}
    },
  })

export const handleUpdateSettingGeneral = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    {
      data: AccountT
    },
    {
      notify?: boolean
      notifyReceiptNotification?: boolean
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/guest/me/setting-general',
      method: 'PUT',
      body: _.omit(params, ['callback']),
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    invalidatesTags: ['Account'],
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      console.log(
        '🛠 LOG: 🚀 --> ---------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      console.log(
        '🛠 LOG: 🚀 --> ~ file: order.tsx ~ line 24 ~ response',
        response,
      )
      console.log(
        '🛠 LOG: 🚀 --> ---------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      arg?.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`
    async onQueryStarted(_, { queryFulfilled }) {
      try {
        const { data: updatedPost } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: document.ts ~ line 28 ~ onQueryStarted ~ updatedPost',
          updatedPost,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {}
    },
  })

export const handleGetInfo = (build: EndpointBuilder<any, any, any>) => {
  return build.query<AccountT, void>({
    query: () => '/guest/me',
    keepUnusedDataFor: 60,

    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => {
      return response.data
    },
    providesTags: ['Account'],

    // The 2nd parameter is the destructured `MutationLifecycleApi`
  })
}

export const handleGetInfoDriver = (build: EndpointBuilder<any, any, any>) => {
  return build.query<
    AccountT & {
      vehicles: { vehicleCategory: OrderVehicleCategoryT }[]
    },
    {
      driveId: number
    }
  >({
    query: ({ ...params }) => `/driver/${params.driveId}`,
    keepUnusedDataFor: 60,

    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => {
      return response
    },

    // The 2nd parameter is the destructured `MutationLifecycleApi`
  })
}

export const handleChangePassword = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    ChangePasswordT & {
      error?: {
        message: string
        status: STATUS_API
      }
      status?: 'ok'
    },
    {
      oldPassword: string
      newPassword: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/guest/change-password',
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

export const handleDisableUser = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { data?: any },
    {
      callback?: () => void
    }
  >({
    query: () => ({
      url: '/guest/me/disable',
      method: 'PUT',
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.()
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data: updatedPost } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: document.ts ~ line 28 ~ onQueryStarted ~ updatedPost',
          updatedPost,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {}
    },
  })
