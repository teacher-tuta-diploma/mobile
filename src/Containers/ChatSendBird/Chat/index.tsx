import React from 'react'
import { useGroupChannelMessages } from '@sendbird/uikit-chat-hooks'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import {
  createGroupChannelModule,
  GroupChannelProps,
  ScrollToBottomButton,
  StatusComposition,
  useSendbirdChat,
} from '../Uikit'
import Container from '@/Components/Container'
import { useFreshCallback, useTheme } from '@/Hooks'
import Messages from './components/Messages'
import { messageComparator } from '@sendbird/uikit-utils'
import { goBack, RootStackParamList } from '@/Navigators/utils'
import InputMessage from './components/InputMessage'

const ChatScreen = ({ enableTypingIndicator = true }) => {
  const { Colors } = useTheme()

  const { sdk, currentUser } = useSendbirdChat()
  const { params } = useRoute<RouteProp<RootStackParamList, 'ChatScreen'>>()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'FileViewer'>>()

  const channel = sdk.groupChannel.buildGroupChannelFromSerializedData(
    params.serializedChannel,
  )

  const {
    messages,
    activeChannel,

    nextMessages,
    newMessagesFromMembers,
    next,
    prev,

    // updateFileMessage,
    // updateUserMessage,
    resendMessage,
    deleteMessage,
    loading,
  } = useGroupChannelMessages(sdk, channel, currentUser?.userId, {
    sortComparator: messageComparator,
    enableCollectionWithoutLocalCache: true,
  })

  const GroupChannelModule = createGroupChannelModule()

  const _renderMessage: GroupChannelProps['MessageList']['renderMessage'] =
    useFreshCallback(props => {
      return <Messages {...props} />
    })

  const onPressHeaderLeft = useFreshCallback(() => {
    goBack()
  })

  return (
    <GroupChannelModule.Provider
      channel={activeChannel}
      enableTypingIndicator={enableTypingIndicator}
      keyboardAvoidOffset={0}
    >
      <GroupChannelModule.Header
        onPressHeaderLeft={onPressHeaderLeft}
        onPressHeaderRight={() => {}}
      />
      <StatusComposition
        loading={loading}
        LoadingComponent={<GroupChannelModule.StatusLoading />}
      >
        <GroupChannelModule.MessageList
          enableMessageGrouping={true}
          currentUserId={currentUser?.userId}
          channel={activeChannel}
          renderMessage={_renderMessage}
          messages={messages}
          nextMessages={nextMessages}
          newMessagesFromMembers={newMessagesFromMembers}
          onTopReached={prev}
          onBottomReached={next}
          renderNewMessagesButton={() => <Container />}
          renderScrollToBottomButton={props => (
            <ScrollToBottomButton iconColor={Colors.primary} {...props} />
          )}
          onResendFailedMessage={resendMessage}
          onDeleteMessage={deleteMessage}
          // onPressImageMessage={(message: FileMessage, uri: string) => {}}
          onPressMediaMessage={fileMessage => {
            console.log(
              '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
            )
            console.log(
              '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 127 ~ ChatScreen ~ fileMessage',
              fileMessage,
            )
            console.log(
              '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
            )
            // Navigate to media viewer
            navigation.navigate('FileViewer', {
              serializedFileMessage: fileMessage.serialize(),
              deleteMessage: () => deleteMessage(fileMessage),
            })
          }} // flatListProps={memoizedFlatListProps}
        />
        <InputMessage />
      </StatusComposition>
    </GroupChannelModule.Provider>
  )
}

export default ChatScreen
