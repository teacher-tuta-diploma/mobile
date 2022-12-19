import {
  CreateDocT,
  DocumentT,
  ResourceT,
  UPloadedLinkT,
} from '@/Store/Authentication/types'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import _ from 'lodash'

export const handleUploadFile = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    {
      status: string
      createdDocs: CreateDocT[]
      uploadedLink: UPloadedLinkT[]
    },
    {
      file: FormData
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/multiple-upload',
      method: 'POST',
      body: post.file,
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

export const handleUploadBase64 = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    {
      status: string
      createdDocs: CreateDocT[]
      uploadedLink: UPloadedLinkT[]
    },
    {
      type: string
      content: string
      name: string
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/upload-base64',
      method: 'POST',
      body: _.omit(post, ['callback']),
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

export const handleLinkFile = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<
    {
      rs: ResourceT[]
      status: 'created'
    },
    {
      userId: number
      type: string[]
      docs: number[]
      callback?: () => void
    }
  >({
    query: ({ ...post }) => ({
      url: '/',
      method: 'POST',
      body: {
        ...post,
        ref: 'guest',
      },
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

export const handleGetDocument = (build: EndpointBuilder<any, any, any>) => {
  return build.query<
    {
      data: DocumentT[]
    },
    {
      authToken: string
    }
  >({
    query: ({ ...params }) => ({
      url: '/me',
      method: 'GET',
      params: {
        page: 1,
        limit: 1,
        order: 'id:desc',
        search: 'type:=:0',
      },
      headers: {
        authorization: `Bearer ${params.authToken}`,
      },
    }),

    // Pick out data and prevent nested properties in a hook or selector
    transformResponse: response => {
      return response
    },

    // The 2nd parameter is the destructured `MutationLifecycleApi`
  })
}
