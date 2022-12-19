import {
  AdvertisementsT,
  PaymentMethodT,
  WorkingAreaT,
} from '@/Store/Delivery/type'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const handleGetPaymentMethod = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { data: PaymentMethodT[] },
    {
      callback?: (response: any) => void
    }
  >({
    query: ({}) => ({
      url: '/v1/user/payments-method/',
      method: 'GET',
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
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

export const handleGetAdvertisements = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.query<
    { data: AdvertisementsT[]; total: number; pages: number },
    {
      callback?: (response: any) => void
    }
  >({
    query: ({}) => ({
      url: '/v1/user/advertisements/',
      method: 'GET',
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
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

export const handleGetWorkingAreaById = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.query<
    WorkingAreaT,
    {
      id: number
      callback?: (response: any) => void
    }
  >({
    query: ({ ...param }) => ({
      url: '/v1/user/working-area/' + param.id,
      method: 'GET',
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
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

export const handleGetHotline = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { data: { area: string; telephone: string }[] },
    {
      callback?: (response: any) => void
    }
  >({
    query: ({}) => ({
      url: '/v1/user/hotline/',
      method: 'GET',
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
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

export const handleGetVideoConfig = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { data: any },
    {
      callback?: (response: any) => void
    }
  >({
    query: ({}) => ({
      url: '/v1/video-config/',
      method: 'GET',
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
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
