import { VehicleT } from '@/Store/Delivery/type'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import _ from 'lodash'

export const handleGetVehicle = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { data: any[] },
    {
      height?: number
      width?: number
      length?: number
      volumn?: number
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => {
      const search =
        !_.isEmpty(params.height) &&
        !_.isEmpty(params.width) &&
        !_.isEmpty(params.length) &&
        !_.isEmpty(params.volumn)
          ? `${params.height ? `height:>=:${params.height};` : ''}${
              params.width ? `width:>=:${params.width};` : ''
            }${params.length ? `length:>=:${params.length};` : ''}${
              params.volumn ? `capacity:>=:${params.volumn}` : ''
            }`
          : undefined
      console.log(
        '🛠 LOG: 🚀 --> -------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      console.log(
        '🛠 LOG: 🚀 --> ~ file: veihicle.ts ~ line 17 ~ search',
        search,
      )
      console.log(
        '🛠 LOG: 🚀 --> -------------------------------------------------------------🛠 LOG: 🚀 -->',
      )

      return {
        url: '/v1/user/vehicle-category/',
        params: { search },
        method: 'GET',
        Headers: {
          accept: 'text/html; charset=utf-8',
        },
      }
    },
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      console.log(
        '🛠 LOG: 🚀 --> -------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      console.log('🛠 LOG: 🚀 --> ~ file: veihicle.ts ~ line 38 ~ arg', arg)
      console.log(
        '🛠 LOG: 🚀 --> -------------------------------------------------------🛠 LOG: 🚀 -->',
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
          params,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {}
    },
  })

export const handleGetVehicleDetail = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    VehicleT,
    {
      vehicleId?: number
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => {
      return {
        url: `/v1/user/vehicle/${params.vehicleId}`,
        method: 'GET',
        Headers: {
          accept: 'text/html; charset=utf-8',
        },
      }
    },
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
      console.log(
        '🛠 LOG: 🚀 --> -------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      console.log('🛠 LOG: 🚀 --> ~ file: veihicle.ts ~ line 38 ~ arg', arg)
      console.log(
        '🛠 LOG: 🚀 --> -------------------------------------------------------🛠 LOG: 🚀 -->',
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
          params,
        )
        console.log(
          '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
        )
      } catch (e) {}
    },
  })
