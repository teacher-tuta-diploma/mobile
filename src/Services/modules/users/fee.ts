import { ExpectedFeeT, transportFeeT, promotonT } from '@/Store/Delivery/type'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const handleExpectedFee = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { data: ExpectedFeeT[] },
    {
      orderCode: string
      promoCode?: string
      expectFee: {
        key: string
        name: string
        price: number
        quantity?: number
      }[]
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/expect-fee',
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
    // The 2nd parameter is the destructured `MutationLifecycleApi`
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data: updatedPost } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: fee.ts ~ line 33 ~ onQueryStarted ~ updatedPost',
          updatedPost,
        )
        console.log(
          '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {}
    },
  })

export const handletransportFee = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    transportFeeT,
    {
      vehicleCategoryId: number
      distance: number
      callback?: (response: transportFeeT) => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/transport-fee',
      method: 'POST',
      body: post,
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data: updatedPost } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: fee.ts ~ line 33 ~ onQueryStarted ~ updatedPost',
          updatedPost,
        )
        console.log(
          '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {}
    },
  })

export const handleGetPromotionList = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { data: promotonT[] },
    {
      page?: number
      limit?: number
      order?: string
      search?: string
      code?: string
      callback?: (response: transportFeeT) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/promotion',
      method: 'GET',
      params: {
        code: params.code,
        page: params.page,
        limit: params.limit,
      },
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data: updatedPost } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: fee.ts ~ line 33 ~ onQueryStarted ~ updatedPost',
          updatedPost,
        )
        console.log(
          '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {}
    },
  })

export const handleGetPaymentVNP = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { url: string },
    {
      code?: string
      callback?: (response: transportFeeT) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/payment/VNPAY/generate',
      method: 'GET',
      params: {
        code: params.code,
      },
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      arg.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`
    async onQueryStarted({}, { queryFulfilled }) {
      try {
        const { data: updatedPost } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: fee.ts ~ line 33 ~ onQueryStarted ~ updatedPost',
          updatedPost,
        )
        console.log(
          '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {}
    },
  })
