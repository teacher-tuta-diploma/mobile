import React from 'react'
import { Pressable, View } from 'react-native'

import { createStyleSheet } from '@sendbird/uikit-react-native-foundation'
import type { SendbirdMessage } from '@sendbird/uikit-utils'
import {
  calcMessageGrouping,
  conditionChaining,
  isMyMessage,
  useIIFE,
} from '@sendbird/uikit-utils'

import { DEFAULT_LONG_PRESS_DELAY } from '../../constants'
import type { GroupChannelProps } from '../../domain/groupChannel/types'
import MessageContainer from './MessageContainer'
import MessageDateSeparator from './MessageDateSeparator'
import MessageIncomingAvatar from './MessageIncomingAvatar'
import MessageIncomingSenderName from './MessageIncomingSenderName'
import MessageOutgoingStatus from './MessageOutgoingStatus'
import MessageTime from './MessageTime'
import UserMessage from './UserMessage'
import FileMessage from './FileMessage'
import AdminMessage from './AdminMessage'
import UnknownMessage from './UnknownMessage'

type MessageStyleVariant = 'outgoing' | 'incoming'
export interface MessageRendererInterface<T = SendbirdMessage> {
  message: T
  prevMessage?: SendbirdMessage
  nextMessage?: SendbirdMessage
  variant: MessageStyleVariant
  groupWithPrev: boolean
  groupWithNext: boolean
  pressed: boolean
}

const MessageRenderer: GroupChannelProps['Fragment']['renderMessage'] = ({
  currentUserId,
  channel,
  message,
  onPress,
  onLongPress,
  ...rest
}) => {
  // console.log(
  //   '🛠 LOG: 🚀 --> -------------------------------------------------------------🛠 LOG: 🚀 -->',
  // )
  // console.log('🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 45 ~ message', message)
  // console.log(
  //   '🛠 LOG: 🚀 --> -------------------------------------------------------------🛠 LOG: 🚀 -->',
  // )
  const variant: MessageStyleVariant = isMyMessage(message, currentUserId)
    ? 'outgoing'
    : 'incoming'
  const isOutgoing = variant === 'outgoing'
  const isIncoming = variant === 'incoming'
  const variantContainerStyle = {
    incoming: styles.chatIncoming,
    outgoing: styles.chatOutgoing,
  }[variant]

  const { groupWithPrev, groupWithNext } = calcMessageGrouping(
    Boolean(rest.enableMessageGrouping),
    message,
    rest.prevMessage,
    rest.nextMessage,
  )

  const messageComponent = useIIFE(() => {
    const pressableProps = {
      style: styles.msgContainer,
      disabled: !onPress && !onLongPress,
      onPress,
      onLongPress,
      delayLongPress: DEFAULT_LONG_PRESS_DELAY,
    }
    const messageProps = { ...rest, variant, groupWithNext, groupWithPrev }

    if (message.isUserMessage()) {
      return (
        <Pressable {...pressableProps}>
          {({ pressed }) => (
            <UserMessage
              message={message}
              pressed={pressed}
              {...messageProps}
            />
          )}
        </Pressable>
      )
    }

    if (message.isFileMessage()) {
      return (
        <Pressable {...pressableProps}>
          {({ pressed }) => (
            <FileMessage
              message={message}
              pressed={pressed}
              {...messageProps}
            />
          )}
        </Pressable>
      )
    }

    if (message.isAdminMessage()) {
      return (
        <AdminMessage message={message} pressed={false} {...messageProps} />
      )
    }

    return (
      <Pressable {...pressableProps}>
        {({ pressed }) => (
          <UnknownMessage
            message={message}
            pressed={pressed}
            {...messageProps}
          />
        )}
      </Pressable>
    )
  })

  return (
    <MessageContainer>
      <MessageDateSeparator message={message} prevMessage={rest.prevMessage} />
      {message.isAdminMessage() && messageComponent}
      {!message.isAdminMessage() && (
        <View
          style={[
            variantContainerStyle,
            conditionChaining(
              [groupWithNext, Boolean(rest.nextMessage)],
              [styles.chatGroup, styles.chatNonGroup, styles.chatLastMessage],
            ),
          ]}
        >
          {isOutgoing && (
            <View style={styles.outgoingContainer}>
              <MessageOutgoingStatus channel={channel} message={message} />
              <MessageTime
                message={message}
                grouping={groupWithNext}
                style={styles.timeOutgoing}
              />
            </View>
          )}
          {isIncoming && (
            <MessageIncomingAvatar message={message} grouping={groupWithNext} />
          )}
          <View style={styles.bubbleContainer}>
            {isIncoming && (
              <MessageIncomingSenderName
                message={message}
                grouping={groupWithPrev}
              />
            )}
            <View style={styles.bubbleWrapper}>
              {messageComponent}
              {isIncoming && (
                <MessageTime
                  message={message}
                  grouping={groupWithNext}
                  style={styles.timeIncoming}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </MessageContainer>
  )
}

const styles = createStyleSheet({
  chatIncoming: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  chatOutgoing: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  timeIncoming: {
    marginLeft: 4,
  },
  timeOutgoing: {
    marginRight: 4,
  },
  chatGroup: {
    marginBottom: 2,
  },
  chatNonGroup: {
    marginBottom: 16,
  },
  chatLastMessage: {
    marginBottom: 16,
  },
  msgContainer: {
    maxWidth: 240,
  },
  bubbleContainer: {
    flexShrink: 1,
  },
  bubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  outgoingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default React.memo(MessageRenderer)
