/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { LogBox } from 'react-native'

import App from './src/App'
import { name as appName } from './app.json'
import './src/Containers/ChatSendBird/Uikit/libs/notification'

navigator.geolocation = require('react-native-geolocation-service')
if (__DEV__) {
  LogBox.ignoreLogs([
    'UIKit Warning',
    "Warning: Can't perform",
    'FileViewer > params.deleteMessage (Function)',
  ])

  LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
  LogBox.ignoreAllLogs() //Ignore all log notifications
}
AppRegistry.registerComponent(appName, () => App)
