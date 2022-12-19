import React, { useState } from 'react'

import type { SendbirdFileMessage } from '@sendbird/uikit-utils'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'
import { FileViewer, useSendbirdChat } from '../Uikit'

const FileViewerScreen = () => {
  const { sdk } = useSendbirdChat()
  const { params } = useRoute<RouteProp<RootStackParamList, 'FileViewer'>>()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'FileViewer'>>()
  const [fileMessage] = useState(
    () =>
      sdk.message.buildMessageFromSerializedData(
        params?.serializedFileMessage,
      ) as SendbirdFileMessage,
  )
  return (
    <FileViewer
      fileMessage={fileMessage}
      onClose={() => navigation.goBack()}
      deleteMessage={params.deleteMessage}
    />
  )
}

export default FileViewerScreen
