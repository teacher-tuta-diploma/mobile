import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'
import SplashScreen from 'react-native-splash-screen'
import codePush from 'react-native-code-push'
import PopupGlobalProvider from './Provider/PopupProvider'
import DatePickerProvider from './Provider/DatePickerProvider'
import LoadingGlobalProvider from './Provider/LoadingProvider'
import GeolocationProvider from './Provider/GeolocationProvider'
import NetworkProvider from './Provider/NetworkProvider'
import AlertMessageProvider from './Provider/AlertProvider'
import { OrderProvider } from './Provider/OrderProvider'
import ImagePickerProvider from './Provider/ImagePickerProvider'
import { ChatProvider } from './Provider/ChatProvider'
import { CallProvider } from './Provider/CallProvider'
import BottomSheetProvider from './Provider/BottomSheeetProvider'

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
}
const App = () => {
  const codePushStatusDidChange = (status: codePush.SyncStatus) => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.')
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.')
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.')
        break
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.')
        SplashScreen.hide()
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.')
        SplashScreen.hide()
        break
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('Update error.')
        SplashScreen.hide()
        break
    }
  }
  useEffect(() => {
    codePush.sync(
      {
        updateDialog: {
          appendReleaseDescription: true,
        },
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
    )
  }, [])

  return (
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={null} persistor={persistor}>
        <PopupGlobalProvider>
          <NetworkProvider>
            <ChatProvider>
              <CallProvider>
                <AlertMessageProvider>
                  <GeolocationProvider>
                    <LoadingGlobalProvider>
                      <DatePickerProvider>
                        <ImagePickerProvider>
                          <OrderProvider>
                            <BottomSheetProvider>
                              <ApplicationNavigator />
                            </BottomSheetProvider>
                          </OrderProvider>
                        </ImagePickerProvider>
                      </DatePickerProvider>
                    </LoadingGlobalProvider>
                  </GeolocationProvider>
                </AlertMessageProvider>
              </CallProvider>
            </ChatProvider>
          </NetworkProvider>
        </PopupGlobalProvider>
      </PersistGate>
    </Provider>
  )
}

export default codePush(codePushOptions)(App)
