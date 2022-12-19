import { LocationDistanceT, LocationResultT } from '@/Store/Delivery/type'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const handleGetMyLocation = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    LocationResultT,
    | {
        latlng: string
        apiMapKey: string
        callback?: (response: LocationResultT) => void
      }
    | undefined
  >({
    query: ({ ...params }) => ({
      url: '/geocode/json',
      method: 'GET',
      params: { latlng: params.latlng, sensor: false, key: params.apiMapKey },
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
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

export const handleGetDistance = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    LocationDistanceT,
    | {
        origin: string
        destination: string
        callback?: (response: LocationDistanceT) => void
      }
    | undefined
  >({
    query: ({ ...params }) => ({
      url: '/distance',
      method: 'POST',
      body: { origin: params.origin, destination: params.destination },
      Headers: {
        accept: 'text/html; charset=utf-8',
      },
    }),
    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: (response, meta, arg) => {
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
