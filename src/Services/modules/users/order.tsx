import {
  OrderCompleteT,
  OrderLocationT,
  OrderT,
  Bills,
  EvaluateSettingT,
  EvaluateT,
} from '@/Store/Delivery/type'
import { setReceivedNotification } from '@/Store/Message'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import _ from 'lodash'

export const handleGetOrderDetail = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    {
      data: OrderT & {
        surveyLocation: string
        contactHuman: string
        telephoneContact: string
        surveyAppointmentTime: string
      }
    },
    {
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: `/orders/${params.orderCode}`,
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

export const handleGetFirstOrder = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    {
      data: OrderT & {
        surveyLocation: string
        contactHuman: string
        telephoneContact: string
        surveyAppointmentTime: string
      }
    },
    {
      callback?: (response: any) => void
    }
  >({
    query: () => ({
      url: '/orders/first-order/',
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

export const handleCreateOrder = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { data: OrderT },
    {
      serviceId: number
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders',
      method: 'POST',
      body: {
        serviceId: params.serviceId,
      },
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
        '🛠 LOG: 🚀 --> ~ file: order.tsx ~ line 88 ~ response',
        response,
      )
      console.log(
        '🛠 LOG: 🚀 --> ---------------------------------------------------------------🛠 LOG: 🚀 -->',
      )

      arg?.callback?.(response)
      return response
    },
    // The 2nd parameter is the destructured `MutationLifecycleApi`
    async onQueryStarted(params, { queryFulfilled, dispatch }) {
      try {
        const { data: updatedPost } = await queryFulfilled
        console.log(
          '🛠 LOG: 🚀 --> ---------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: order.tsx ~ line 105 ~ onQueryStarted ~ updatedPost',
          updatedPost,
        )
        console.log(
          '🛠 LOG: 🚀 --> ---------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {
        console.log(
          '🛠 LOG: 🚀 --> -------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
        console.log(
          '🛠 LOG: 🚀 --> ~ file: order.tsx ~ line 125 ~ onQueryStarted ~ e',
          e,
        )
        console.log(
          '🛠 LOG: 🚀 --> -------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } finally {
        /**
         * reset notification
         */
        dispatch(
          setReceivedNotification({
            notificationPusherData: undefined,
          }),
        )
      }
    },
  })

export const handlUpdateOrderLocation = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    { data: OrderLocationT[] },
    Partial<
      Pick<
        OrderLocationT,
        | 'contact'
        | 'locationDetail'
        | 'location'
        | 'phone'
        | 'orderCode'
        | 'status'
        | 'type'
        | 'placeId'
        | 'latitude'
        | 'longitude'
        | 'pickupDate'
        | 'pickupType'
        | 'sort'
      >
    > & {
      locationId: number
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders-location/' + params.locationId,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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

export const handlUpdateOrderContract = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    { data: OrderT },
    {
      contractUrl?: string
      signatureUrl: string
      signedContract: boolean
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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

export const handlDeleteOrderLocation = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    {
      data: {
        status: number
      }
    },
    {
      locationId: number
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders-location/' + params.locationId,
      method: 'DELETE',
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

export const handleGetOrderByCode = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { data: OrderLocationT[] },
    {
      limit?: number
      page?: number
      code: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: `/orders-location/find-by-order/${params.code}`,
      method: 'GET',
      params: {
        limit: params.limit,
        page: params.page,
      },
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

export const handleGetListOrder = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { data: OrderT[] },
    {
      limit?: number
      page?: number
      listStatus: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders',
      method: 'GET',
      params: {
        limit: params.limit,
        page: params.page,
        listStatus: params.listStatus,
      },
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

export const handleCreateOrderLocation = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    { data: OrderLocationT },
    Partial<
      Pick<
        OrderLocationT,
        | 'contact'
        | 'locationDetail'
        | 'location'
        | 'phone'
        | 'orderCode'
        | 'status'
        | 'type'
        | 'placeId'
        | 'latitude'
        | 'longitude'
        | 'pickupDate'
        | 'pickupType'
        | 'sort'
      >
    > & {
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders-location',
      method: 'POST',
      body: _.omit(params, ['callback']),
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
    async onQueryStarted(params, { queryFulfilled }) {
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
      } catch (e) {
      } finally {
        params.callback?.({})
      }
    },
  })

export const handleChoiceCarForOrder = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    { data: OrderLocationT },
    {
      orderVehicleCategories: {
        id: number
      }[]
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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

export const handleChoiceServiceForOrder = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    { data: OrderT },
    {
      products: {
        id: number
      }[]
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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

export const handlePutFeeForOrder = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { data: OrderT },
    {
      distance: number
      price: number
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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

export const handlePutTimeForOrder = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { data: OrderT },
    {
      pickupType: number
      pickupDate: string
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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

export const handleChoiceFitmentForOrder = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    { data: OrderLocationT },
    {
      orderFitmentItems: {
        fitmentItemId: number
        quantity: number
      }[]
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback', 'orderCode']),
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

export const handleBookingOrder = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { data: OrderCompleteT },
    {
      status: number
      payType: number
      payDetailType: number
      orderCode: string
      price?: number
      promoCode?: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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
    async onQueryStarted(arg, { queryFulfilled }) {
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
export const handleBookingSurveyOrder = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    { data: OrderCompleteT },
    {
      surveyLocation: string
      contactHuman: string
      telephoneContact: string
      surveyAppointmentTime: string
      status: number
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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
    async onQueryStarted(arg, { queryFulfilled }) {
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
export const handleCancelOrder = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { data: OrderCompleteT },
    {
      status: number
      orderCancelReasons: {
        reason: string
      }[]
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/' + params.orderCode,
      method: 'PUT',
      body: _.omit(params, ['callback']),
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
    async onQueryStarted(arg, { queryFulfilled }) {
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
/**
  'VC' = 'Cước vận chuyển',
  'PRM' = 'Khuyến mãi',
  'TAX' = 'Thuế VAT',
  'PAK' = 'Phí neo xe',
  'OVN' = 'Qua đêm',
  'EXT' = 'Phí phụ trội',
  'RTN' = 'Phí chiều về',
  'RTF' = 'Phí giao thông đường bộ',
  'MSB' = 'Phí xe đi ngoại tỉnh miền núi',
  'FTM' = 'Phí đồ đạc',
 */
export const handleCreateBills = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    { data: Bills },
    {
      orderCode: string
      note?: string
      type: 'ACTL' | 'EXPT'
      promotionCode?: string
      billDetails: {
        key:
          | string
          | 'VC'
          | 'TAX'
          | 'PRM'
          | 'PAK'
          | 'OVN'
          | 'EXT'
          | 'RTN'
          | 'RTF'
          | 'MSB'
          | 'FTM'
        name: string
        price: number
      }[]
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/bills',
      method: 'POST',
      body: _.omit(params, ['callback']),
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
    async onQueryStarted(arg, { queryFulfilled }) {
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

export const handleGetEvaluateSetting = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.query<
    {
      data: EvaluateSettingT[]
    },
    {
      limit?: number
      page?: number
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/user/evaluate-setting',
      method: 'GET',
      params: {
        limit: params.limit,
        page: params.page,
      },
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

export const handleCreateEvaluateOrder = (
  build: EndpointBuilder<any, any, any>,
) =>
  build.mutation<
    { data: EvaluateT },
    {
      applicationEvaluateSettingId?: number
      applicationRateStar: number
      applicationGuestReviews?: string
      serviceEvaluateSettingId?: number
      serviceRateStar: number
      serviceGuestReviews?: string
      orderCode: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/orders/evaluate/' + params.orderCode,
      method: 'POST',
      body: _.omit(params, ['callback']),
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
    async onQueryStarted(arg, { queryFulfilled }) {
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
