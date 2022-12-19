import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import {
  api,
  apiAccount,
  apiDocument,
  apiFee,
  apiMap,
  apiMapServer,
  apiMessage,
  apiOrder,
  apiProduct,
  apiSystem,
  apiVehicle,
  apiNews,
} from '@/Services/api'
import theme from './Theme'
import authentication from './Authentication'
import message from './Message'
import delivery, { DeliveryState } from './Delivery'
import global from './Global'

const persistDeliveryConfig = {
  key: 'delivery',
  storage: AsyncStorage,
  whitelist: ['storedLocations'] as (keyof DeliveryState)[],
}

const persistedDeliveryReducer = persistReducer(persistDeliveryConfig, delivery)

// api.re
const reducers = combineReducers({
  theme,
  [api.reducerPath]: api.reducer,
  [apiAccount.reducerPath]: apiAccount.reducer,
  [apiDocument.reducerPath]: apiDocument.reducer,
  [apiMap.reducerPath]: apiMap.reducer,
  [apiProduct.reducerPath]: apiProduct.reducer,
  [apiOrder.reducerPath]: apiOrder.reducer,
  [apiVehicle.reducerPath]: apiVehicle.reducer,
  [apiSystem.reducerPath]: apiSystem.reducer,
  [apiFee.reducerPath]: apiFee.reducer,
  [apiMessage.reducerPath]: apiMessage.reducer,
  [apiMapServer.reducerPath]: apiMapServer.reducer,
  [apiNews.reducerPath]: apiNews.reducer,
  authentication,
  delivery: persistedDeliveryReducer,
  global,
  message,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'authentication'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .concat(apiAccount.middleware)
      .concat(apiDocument.middleware)
      .concat(apiMap.middleware)
      .concat(apiProduct.middleware)
      .concat(apiOrder.middleware)
      .concat(apiVehicle.middleware)
      .concat(apiSystem.middleware)
      .concat(apiFee.middleware)
      .concat(apiNews.middleware)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
