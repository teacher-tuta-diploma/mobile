import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { Touchable } from '@/Components/Touchable'
import { useFreshCallback, useTheme } from '@/Hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextField from '@/Components/TextInput'
import i18next from 'i18next'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigators/utils'
import {
  GroupChannelProps,
  SBUError,
  useLocalization,
  usePlatformService,
  useSendbirdChat,
} from '../../Uikit'
import { scale } from 'react-native-utils-scale'
import {
  useBottomSheet,
  useToast,
  useAlert,
} from '@sendbird/uikit-react-native-foundation'
import { messageComparator, PASS } from '@sendbird/uikit-utils'
import { useGroupChannelMessages } from '@sendbird/uikit-chat-hooks'
import SBUUtils from '../../Uikit/libs/SBUUtils'
import ImagePicker from 'react-native-image-crop-picker'
import { FileType } from '@sendbird/uikit-react-native'

const MAX_HEIGHT = scale(100)

const InputMessage = () => {
  const { MetricsSizes, Colors, Icons, Layout } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { params } = useRoute<RouteProp<RootStackParamList, 'ChatScreen'>>()
  const { sdk, currentUser } = useSendbirdChat()
  const channel = sdk.groupChannel.buildGroupChannelFromSerializedData(
    params.serializedChannel,
  )
  const [heightInput, setHeightInput] = useState<number>(MetricsSizes.small * 2)
  const [input, setInput] = useState('')
  const { openSheet } = useBottomSheet()
  const onBeforeSendUserMessage = PASS
  const onBeforeSendFileMessage = PASS
  const { fileService } = usePlatformService()
  const toast = useToast()
  const { STRINGS } = useLocalization()
  const { alert } = useAlert()

  const { sendUserMessage, sendFileMessage } = useGroupChannelMessages(
    sdk,
    channel,
    currentUser?.userId,
    {
      sortComparator: messageComparator,
      enableCollectionWithoutLocalCache: true,
    },
  )

  const onSendFileMessage: GroupChannelProps['Input']['onSendFileMessage'] =
    useFreshCallback(async file => {
      const processedParams = await onBeforeSendFileMessage({ file })
      await sendFileMessage(processedParams)
    })

  const onSendUserMessage: GroupChannelProps['Input']['onSendUserMessage'] =
    useFreshCallback(async text => {
      if (input.length > 0) {
        try {
          setInput('')
          const processedParams = await onBeforeSendUserMessage({
            message: text,
          })
          await sendUserMessage(processedParams)
        } catch (e: any) {
          console.log('failure user mes', e)
        }
      }
    })

  const onPressAttachment = () => {
    openSheet({
      sheetItems: [
        {
          title: STRINGS.GROUP_CHANNEL.DIALOG_ATTACHMENT_CAMERA,
          icon: 'camera',
          onPress: async () => {
            const img = await ImagePicker.openCamera({
              width: 3000,
              height: 4000,
              cropping: true,
              mediaType: 'photo',
              freeStyleCropEnabled: true,
            })
            const path = img.path.split('/')

            console.log(
              '🛠 LOG: 🚀 --> ----------------------------------------------------------------🛠 LOG: 🚀 -->',
            )
            console.log(
              '🛠 LOG: 🚀 --> ~ file: InputMessage.tsx:96 ~ onPress: ~ img',
              img,
            )
            console.log(
              '🛠 LOG: 🚀 --> ----------------------------------------------------------------🛠 LOG: 🚀 -->',
            )
            const customPhoto: FileType = {
              name: path[path.length - 1],
              size: img.size,
              type: img.mime,
              uri: img.path,
            }

            onSendFileMessage(customPhoto).catch(() =>
              toast.show(STRINGS.TOAST.SEND_MSG_ERROR, 'error'),
            )
          },
        },
        {
          title: STRINGS.GROUP_CHANNEL.DIALOG_ATTACHMENT_PHOTO_LIBRARY,
          icon: 'photo',
          onPress: async () => {
            const photo = await fileService.openMediaLibrary({
              selectionLimit: 1,
              mediaType: 'all',
              onOpenFailure: error => {
                console.log(
                  '🛠 LOG: 🚀 --> ------------------------------------------------------------------------🛠 LOG: 🚀 -->',
                )
                console.log(
                  '🛠 LOG: 🚀 --> ~ file: SendInput.tsx ~ line 72 ~ onPress: ~ error',
                  error,
                )
                console.log(
                  '🛠 LOG: 🚀 --> ------------------------------------------------------------------------🛠 LOG: 🚀 -->',
                )
                if (error.code === SBUError.CODE.ERR_PERMISSIONS_DENIED) {
                  alert({
                    title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                    message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(
                      'device storage',
                      'UIKitSample',
                    ),
                    buttons: [
                      {
                        text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                        onPress: () => SBUUtils.openSettings(),
                      },
                    ],
                  })
                } else {
                  toast.show(STRINGS.TOAST.OPEN_PHOTO_LIBRARY_ERROR, 'error')
                }
              },
            })

            if (photo && photo[0]) {
              onSendFileMessage(photo[0]).catch(() =>
                toast.show(STRINGS.TOAST.SEND_MSG_ERROR, 'error'),
              )
            }
          },
        },
        {
          title: STRINGS.GROUP_CHANNEL.DIALOG_ATTACHMENT_FILES,
          icon: 'document',
          onPress: async () => {
            const file = await fileService.openDocument({
              onOpenFailure: () =>
                toast.show(STRINGS.TOAST.OPEN_FILES_ERROR, 'error'),
            })

            if (file) {
              onSendFileMessage(file).catch(() =>
                toast.show(STRINGS.TOAST.SEND_MSG_ERROR, 'error'),
              )
            }
          },
        },
      ],
    })
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-bottom + MetricsSizes.tiny}
      behavior={Platform.select({ ios: 'padding', default: undefined })}
    >
      <Container
        jc="space-between"
        mh={MetricsSizes.tiny}
        style={style.inputContainer}
      >
        <Touchable onPress={onPressAttachment}>
          <Image
            source={Icons.camera_chat}
            w={MetricsSizes.small}
            h={MetricsSizes.small}
          />
        </Touchable>
        <Image
          source={Icons.emoji}
          w={MetricsSizes.small}
          h={MetricsSizes.small}
        />
        <TextField
          placeholder={i18next.t('Chat.input')}
          placeholderTextColor={Colors.grey}
          onChangeText={content => {
            if (content.length > 0) {
              channel.startTyping()
            } else {
              channel.endTyping()
            }
            setInput(content)
          }}
          onContentSizeChange={event => {
            setHeightInput(
              event.nativeEvent.contentSize.height < MetricsSizes.small * 2
                ? MetricsSizes.small * 2
                : event.nativeEvent.contentSize.height,
            )
          }}
          style={{
            height: heightInput,
            maxHeight: MAX_HEIGHT,
            width: '85%',
          }}
          value={input}
          inputStyle={{
            height: heightInput,
            maxHeight: MAX_HEIGHT,
            paddingTop: MetricsSizes.tiny,
          }}
          textAlignVertical="center"
          multiline={true}
          renderRightAccessory={() => {
            return (
              <Touchable
                onPress={() => onSendUserMessage(input)}
                flexDr="row"
                style={Layout.fullHeight}
                ai="center"
              >
                <Container
                  w={1}
                  bg={Colors.borderInput}
                  style={Layout.fullHeight}
                />
                <Container ph={MetricsSizes.small}>
                  <Image
                    source={Icons.send_msg}
                    w={MetricsSizes.small}
                    h={MetricsSizes.small}
                  />
                </Container>
              </Touchable>
            )
          }}
        />
      </Container>
      <View style={{ height: bottom }} />
    </KeyboardAvoidingView>
  )
}

export default InputMessage

const style = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerRightButton: {
    marginRight: 10,
  },
  errorContainer: {
    backgroundColor: '#333',
    opacity: 0.8,
    padding: 10,
  },
  error: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 24,
    color: '#999',
    alignSelf: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  input: {
    maxHeight: 100,
    flex: 1,
    fontSize: 20,
    color: '#555',
  },
  uploadButton: {
    marginRight: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
})
