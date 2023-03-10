import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import { Avatar } from '@sendbird/uikit-react-native-foundation'
import {
  SendbirdGroupChannel,
  getMembersExcludeMe,
  isDefaultCoverImage,
} from '@sendbird/uikit-utils'

import { useSendbirdChat } from '../hooks/useContext'

type Props = {
  channel: SendbirdGroupChannel
  size?: number
  containerStyle?: StyleProp<ViewStyle>
}

const ChannelCover = ({ channel, ...avatarProps }: Props) => {
  const { currentUser } = useSendbirdChat()

  // channel cover
  if (!isDefaultCoverImage(channel.coverUrl) || !currentUser) {
    return <Avatar uri={channel.coverUrl} {...avatarProps} />
  }

  // no members, use anonymous profile
  if (channel.memberCount <= 1) {
    return <Avatar {...avatarProps} />
  }

  // 1:1, use member profile
  if (channel.memberCount === 2) {
    const otherUserProfile = channel.members.filter(
      m => m.userId !== currentUser.userId,
    )?.[0]?.profileUrl
    return <Avatar uri={otherUserProfile} {...avatarProps} />
  }

  // group, use members profile
  return (
    <Avatar.Group {...avatarProps}>
      {getMembersExcludeMe(channel, currentUser?.userId).map(m => (
        <Avatar key={m.userId} uri={m.profileUrl} />
      ))}
    </Avatar.Group>
  )
}

export default ChannelCover
