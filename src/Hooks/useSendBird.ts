import Clipboard from '@react-native-clipboard/clipboard'
import CameraRoll from '@react-native-community/cameraroll'
import RNFBMessaging from '@react-native-firebase/messaging'
import Video from 'react-native-video'
import * as DocumentPicker from 'react-native-document-picker'
import * as FileAccess from 'react-native-file-access'
import * as ImagePicker from 'react-native-image-picker'
import * as Permissions from 'react-native-permissions'
import * as CreateThumbnail from 'react-native-create-thumbnail'
import {
  createNativeClipboardService,
  createNativeFileService,
  createNativeMediaService,
  createNativeNotificationService,
} from '@/Containers/ChatSendBird/Uikit'
import { SendbirdChatSDK } from '@sendbird/uikit-utils'

let AppSendbirdSDK: SendbirdChatSDK
export const GetSendbirdSDK = () => AppSendbirdSDK
export const SetSendbirdSDK = (sdk: SendbirdChatSDK) => (AppSendbirdSDK = sdk)

export const ClipboardService = createNativeClipboardService(Clipboard)
export const NotificationService = createNativeNotificationService({
  messagingModule: RNFBMessaging,
  permissionModule: Permissions,
})
export const FileService = createNativeFileService({
  fsModule: FileAccess,
  permissionModule: Permissions,
  imagePickerModule: ImagePicker,
  mediaLibraryModule: CameraRoll,
  documentPickerModule: DocumentPicker,
})
export const MediaService = createNativeMediaService({
  VideoComponent: Video,
  thumbnailModule: CreateThumbnail,
})
