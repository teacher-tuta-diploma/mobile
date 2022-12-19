import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { SendbirdMessage } from '@sendbird/uikit-utils'
import {
  calcMessageGrouping,
  conditionChaining,
  isMyMessage,
} from '@sendbird/uikit-utils'

import { GroupChannel } from '@sendbird/chat/groupChannel'
import { useIIFE } from '@/Hooks'
import { DEFAULT_LONG_PRESS_DELAY } from '../../Uikit/constants'
import UserMessage from './UserMessage'
import MessageContainer from '../../Uikit/components/MessageRenderer/MessageContainer'
import MessageDateSeparator from '../../Uikit/components/MessageRenderer/MessageDateSeparator'
import MessageIncomingAvatar from '../../Uikit/components/MessageRenderer/MessageIncomingAvatar'
import MessageTime from '../../Uikit/components/MessageRenderer/MessageTime'
import MessageOutgoingStatus from '../../Uikit/components/MessageRenderer/MessageOutgoingStatus'
import MessageIncomingSenderName from '../../Uikit/components/MessageRenderer/MessageIncomingSenderName'
import AdminMessage from '../../Uikit/components/MessageRenderer/AdminMessage'
import FileMessage from '../../Uikit/components/MessageRenderer/FileMessage'

type Props = {
  message: SendbirdMessage
  prevMessage?: SendbirdMessage
  nextMessage?: SendbirdMessage
  onPress?: () => void
  onLongPress?: () => void
  channel: GroupChannel
  currentUserId?: string
  enableMessageGrouping: boolean
}

export type MessageStyleVariant = 'outgoing' | 'incoming'

const Messages = ({ message, onPress, onLongPress, ...other }: Props) => {
  const variant: MessageStyleVariant = isMyMessage(message, other.currentUserId)
    ? 'outgoing'
    : 'incoming'
  const isOutgoing = variant === 'outgoing'
  const isIncoming = variant === 'incoming'
  const variantContainerStyle = {
    incoming: styles.chatIncoming,
    outgoing: styles.chatOutgoing,
  }[variant]

  const { groupWithPrev, groupWithNext } = calcMessageGrouping(
    Boolean(other.enableMessageGrouping),
    message,
    other.prevMessage,
    other.nextMessage,
  )

  const messageComponent = useIIFE(() => {
    const pressableProps = {
      style: styles.msgContainer,
      delayLongPress: DEFAULT_LONG_PRESS_DELAY,
      disabled: !onPress && !onLongPress,
      onPress,
      onLongPress,
    }

    const messageProps = { ...other, variant, groupWithNext, groupWithPrev }

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
  })

  return (
    <MessageContainer>
      <MessageDateSeparator message={message} prevMessage={other.prevMessage} />
      {message.isAdminMessage() && messageComponent}
      {!message.isAdminMessage() && (
        <View
          style={[
            variantContainerStyle,
            conditionChaining(
              [groupWithNext, Boolean(other.nextMessage)],
              [styles.chatGroup, styles.chatNonGroup, styles.chatLastMessage],
            ),
          ]}
        >
          {isOutgoing && (
            <View style={styles.outgoingContainer}>
              <MessageOutgoingStatus
                channel={other.channel}
                message={message}
              />
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

export default Messages

const styles = StyleSheet.create({
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
