import { Text } from 'react-native'
import Container from '@/Components/Container'
import { Touchable } from '@/Components/Touchable'
import Image from '@/Components/Image'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@/Hooks'
import { GroupChannel } from '@sendbird/chat/groupChannel'
import {
  createChannelName,
  createUnreadMessageCount,
  ellipsis,
} from '@/Containers/ChatSendBird/Uikit/libs/SBUUtils'
import moment from 'moment'

const LAST_MESSAGE_ELLIPSIS = 45

type Props = {
  item: GroupChannel
  onPress?: (channel: GroupChannel) => void
}
const MessageItem = ({ item, onPress }: Props) => {
  const [name, setName] = useState('')
  const [lastMessage, setLastMessage] = useState('')
  const [unreadMessageCount, setUnreadMessageCount] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')

  const { Fonts, Colors, Layout, Images, MetricsSizes, Gutters } = useTheme()

  const updateChannelName = (channel: GroupChannel) => {
    setName(createChannelName(channel))
  }

  const updateLastMessage = (channel: GroupChannel) => {
    if (channel.lastMessage) {
      const message = channel.lastMessage
      if (message.isUserMessage()) {
        setLastMessage(message.message)
      } else if (message.isFileMessage()) {
        setLastMessage(message.name)
      }
    }
  }

  const updateUnreadMessageCount = (channel: GroupChannel) => {
    setUnreadMessageCount(createUnreadMessageCount(channel))
  }

  const updateUpdatedAt = (channel: GroupChannel) => {
    setUpdatedAt(
      moment(
        channel.lastMessage ? channel.lastMessage.createdAt : channel.createdAt,
      ).fromNow(),
    )
  }

  useEffect(() => {
    // channel event listener
    updateChannelName(item)
    updateLastMessage(item)
    updateUnreadMessageCount(item)
    updateUpdatedAt(item)
    return () => {}
  }, [item])

  return (
    <>
      <Touchable
        style={[Layout.rowHCenter, Gutters.tinyHPadding]}
        pv={MetricsSizes.tiny}
        onPress={() => onPress?.(item)}
      >
        <Container flexDr="row" ai="center">
          <Image
            source={Images.user_round}
            w={MetricsSizes.small * 2.4}
            h={MetricsSizes.small * 2.4}
            br={500}
            resizeMode="contain"
          />
          <Container ml={MetricsSizes.tiny} flex={1}>
            <Text
              style={[Fonts.textSmallBold, { color: Colors.black }]}
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              style={[Fonts.textTiny, { color: Colors.black }]}
              numberOfLines={1}
            >
              {ellipsis(lastMessage.replace(/\n/g, ' '), LAST_MESSAGE_ELLIPSIS)}
            </Text>
          </Container>
          <Container ml={MetricsSizes.tiny}>
            {item.unreadMessageCount > 0 ? (
              <Text style={[Fonts.textSmallBold]}>
                <Text>{unreadMessageCount}</Text>
              </Text>
            ) : null}
            <Text style={[Fonts.textTiny, { color: Colors.grey }]}>
              {updatedAt}
            </Text>
          </Container>
        </Container>
      </Touchable>
      <Container w={'100%'} h={1} bg={Colors.grey4} />
    </>
  )
}

export default MessageItem
