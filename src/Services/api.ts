import { RootState } from '@/Store'
import { setMessageError } from '@/Store/Global'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import Config from 'react-native-config'

const prepareHeaders = (headers: any, { getState }: any) => {
  // getState() giúp lấy ra toàn bộ state trong store
  // getState().user lấy ra state trong userSlice
  const state = getState() as RootState
  const token = state.authentication.accessToken
  // Nếu có token thì thêm vào headers
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}

const baseQueryAuth = fetchBaseQuery({
  baseUrl: Config.API_URL_AUTH, // Xử lý header trước khi gửi request
  prepareHeaders: prepareHeaders,
})

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryAuth(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
  }
  return result
}

export const api = createApi({
  tagTypes: ['User'],
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiAuth',
})

const baseQueryAccount = fetchBaseQuery({
  baseUrl: Config.API_URL_ACCOUNT, // Xử lý header trước khi gửi request
  prepareHeaders: prepareHeaders,
})

const baseQueryAccountWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, _api, extraOptions) => {
  let result = await baseQueryAccount(args, _api, extraOptions)
  if (result.error && result.error.status === 401) {
  }
  return result
}

export const apiAccount = createApi({
  tagTypes: ['Account'],
  baseQuery: baseQueryAccountWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiAccount',
})

const baseQueryDocument = fetchBaseQuery({
  baseUrl: Config.API_URL_UPLOAD, // Xử lý header trước khi gửi request
})

const baseQueryDocumentWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, _api, extraOptions) => {
  let result = await baseQueryDocument(args, _api, extraOptions)
  return result
}

export const apiDocument = createApi({
  tagTypes: ['Document'],
  baseQuery: baseQueryDocumentWithInterceptor,
  endpoints: () => ({}),
  reducerPath: 'apiDocument',
})

export const apiMap = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.MAP_API,
  }),
  endpoints: () => ({}),
  reducerPath: 'apiMap',
})

export const apiMapServer = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL_MAP,
  }),
  endpoints: () => ({}),
  reducerPath: 'apiMapServer',
})

export const apiProduct = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL_PRODUCT,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: () => ({}),
  reducerPath: 'apiProduct',
})

export const apiOrder = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL_ORDER,
    prepareHeaders: prepareHeaders,
  }),

  endpoints: () => ({}),
  reducerPath: 'apiOrder',
})
apiOrder.middleware =
  ({ dispatch }) =>
  next =>
  action => {
    console.log(
      '🛠 LOG: 🚀 --> ---------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    console.log('🛠 LOG: 🚀 --> ~ file: api.ts ~ line 124 ~ action', action)
    console.log(
      '🛠 LOG: 🚀 --> ---------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    if (action?.meta?.arg?.endpointName === 'handleLoginSocial') {
      return next(action)
    }
    if (isRejectedWithValue(action)) {
      dispatch(
        setMessageError({
          messageError: {
            message: action.payload.data.error.message,
            status: action.payload.status,
          },
        }),
      )
    }
    return next(action)
  }

export const apiVehicle = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL_VEHICLE,
    prepareHeaders: prepareHeaders,
  }),

  endpoints: () => ({}),
  reducerPath: 'apiVehicle',
})

export const apiNews = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL_NEW,
    prepareHeaders: prepareHeaders,
  }),

  endpoints: () => ({}),
  reducerPath: 'apiNews',
})

export const apiSystem = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL_SYSTEM,
    prepareHeaders: prepareHeaders,
  }),

  endpoints: () => ({}),
  reducerPath: 'apiSystem',
})

export const apiFee = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL_FEE,
    prepareHeaders: prepareHeaders,
  }),

  endpoints: () => ({}),
  reducerPath: 'apiFee',
})

export const apiMessage = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL_MESSAGE,
    prepareHeaders: prepareHeaders,
  }),

  endpoints: () => ({}),
  reducerPath: 'apiMessage',
})

export enum STATUS_API {
  UN_AUTHORIZE = 401,
  NOT_FOUND = 404,
  SUCCESS = 200,
  FAIL = 400,
  CONFLICT = 409,
}
