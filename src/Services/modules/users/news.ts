import { NewsT } from '@/Store/Delivery/type'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export const handleGetNews = (build: EndpointBuilder<any, any, any>) =>
  build.query<
    { data: NewsT[] },
    {
      search?: string
      callback?: (response: any) => void
    }
  >({
    query: ({ ...params }) => ({
      url: '/news-api/',
      method: 'GET',
      params: { search: params.search },
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
