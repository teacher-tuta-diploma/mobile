/* eslint-disable react-hooks/rules-of-hooks */
import { StyleSheet, Text } from 'react-native'
import Container from '@/Components/Container'
import { Touchable } from '@/Components/Touchable'
import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import { GroupChannel } from '@sendbird/chat/groupChannel'
import {
  isMyMessage,
  useIIFE,
  isDifferentChannel,
  useUniqId,
  SendbirdUser,
  truncatedBadgeCount,
  getFileExtension,
  getFileType,
} from '@sendbird/uikit-utils'
import {
  useChannelHandler,
  useMessageOutgoingStatus,
} from '@sendbird/uikit-chat-hooks'
import {
  ChannelCover,
  useLocalization,
  useSendbirdChat,
} from '@/Containers/ChatSendBird/Uikit'
import {
  Icon,
  LoadingSpinner,
  useUIKitTheme,
} from '@sendbird/uikit-react-native-foundation'

type Props = {
  item: GroupChannel
  onPress?: (channel: GroupChannel) => void
}
const ChannelItem = ({ item: channel, onPress }: Props) => {
  const { currentUser, sdk, features } = useSendbirdChat()

  const [typingUsers, setTypingUsers] = useState<SendbirdUser[]>([])

  const { Fonts, Colors, Layout, MetricsSizes, Gutters } = useTheme()
  const outgoingStatus = useMessageOutgoingStatus(
    sdk,
    channel,
    channel.lastMessage,
  )
  const { colors } = useUIKitTheme()
  const { STRINGS } = useLocalization()

  if (features.channelListTypingIndicatorEnabled) {
    const typingId = useUniqId('GroupChannelPreviewContainer')
    useChannelHandler(
      sdk,
      `GroupChannelPreviewContainer_TypingIndicator_${typingId}`,
      {
        onTypingStatusUpdated(eventChannel) {
          if (isDifferentChannel(channel, eventChannel)) {
            return
          }
          setTypingUsers(eventChannel.getTypingUsers())
        },
      },
    )
  }

  const iconMapper = {
    audio: 'file-audio',
    image: 'photo',
    video: 'play',
    file: 'file-document',
  } as const

  const bodyIcon = useIIFE(() => {
    if (!channel.lastMessage?.isFileMessage()) {
      return undefined
    }
    if (typingUsers.length > 0) {
      return undefined
    }
    return iconMapper[
      getFileType(
        channel.lastMessage.type || getFileExtension(channel.lastMessage.name),
      )
    ]
  })

  const bodyText = useIIFE(() => {
    if (typingUsers.length > 0) {
      return STRINGS.LABELS.TYPING_INDICATOR_TYPINGS(typingUsers) || ''
    } else {
      return STRINGS.GROUP_CHANNEL_LIST.CHANNEL_PREVIEW_BODY(channel)
    }
  })

  const titleCaptionIcon = useIIFE(() => {
    if (!channel.lastMessage) {
      return undefined
    }
    if (!features.channelListMessageReceiptStatusEnabled) {
      return undefined
    }
    if (!isMyMessage(channel.lastMessage, currentUser?.userId)) {
      return undefined
    }

    if (outgoingStatus === 'PENDING') {
      return <LoadingSpinner size={16} style={styles.titleCaptionIcon} />
    }

    if (outgoingStatus === 'FAILED') {
      return (
        <Icon
          icon={'error'}
          size={16}
          color={colors.error}
          style={styles.titleCaptionIcon}
        />
      )
    }

    if (outgoingStatus === 'UNDELIVERED') {
      return (
        <Icon
          icon={'done'}
          size={16}
          color={colors.onBackground03}
          containerStyle={styles.titleCaptionIcon}
        />
      )
    }

    if (outgoingStatus === 'DELIVERED' || outgoingStatus === 'UNREAD') {
      return (
        <Icon
          icon={'done-all'}
          size={16}
          color={colors.onBackground03}
          style={styles.titleCaptionIcon}
        />
      )
    }

    if (outgoingStatus === 'READ') {
      return (
        <Icon
          icon={'done-all'}
          size={16}
          color={colors.secondary}
          style={styles.titleCaptionIcon}
        />
      )
    }

    return undefined
  })

  return (
    <>
      <Touchable
        style={[Layout.rowHCenter, Gutters.tinyHPadding]}
        pv={MetricsSizes.tiny}
        onPress={() => onPress?.(channel)}
      >
        <Container flexDr="row" ai="center">
          <ChannelCover channel={channel} size={56} />
          <Container ml={MetricsSizes.tiny} flex={1}>
            <Text
              style={[Fonts.textSmallBold, { color: Colors.black }]}
              numberOfLines={1}
            >
              {STRINGS.GROUP_CHANNEL_LIST.CHANNEL_PREVIEW_TITLE(
                currentUser?.userId ?? '',
                channel,
              )}
            </Text>
            <Container flexDr="row">
              {bodyIcon && (
                <Icon size={18} icon={bodyIcon} color={Colors.primary} />
              )}
              <Text
                style={[Fonts.textTiny, { color: Colors.black }]}
                numberOfLines={1}
              >
                {bodyText}
              </Text>
            </Container>
          </Container>
          <Container ml={MetricsSizes.tiny}>
            {channel.unreadMessageCount > 0 ? (
              <Container ai="flex-end">
                <Container
                  bg={Colors.primary}
                  w={MetricsSizes.small}
                  h={MetricsSizes.small}
                  br={MetricsSizes.small / 2}
                  ai="center"
                  jc="center"
                >
                  <Text style={[Fonts.textSmallBold, { color: Colors.white }]}>
                    <Text>
                      {truncatedBadgeCount(channel.unreadMessageCount)}
                    </Text>
                  </Text>
                </Container>
              </Container>
            ) : null}
            <Text style={[Fonts.textTiny, { color: Colors.grey }]}>
              {STRINGS.GROUP_CHANNEL_LIST.CHANNEL_PREVIEW_TITLE_CAPTION(
                channel,
              )}
            </Text>
            {titleCaptionIcon}
          </Container>
        </Container>
      </Touchable>
      <Container w={'100%'} h={1} bg={Colors.grey4} />
    </>
  )
}

export default ChannelItem

const styles = StyleSheet.create({
  titleCaptionIcon: {
    marginRight: 4,
  },
})
