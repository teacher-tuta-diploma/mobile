import { GroupChannel } from '@sendbird/chat/groupChannel'
import { Linking, Platform } from 'react-native'

export default class SBUUtils {
  static openSettings() {
    Linking.openSettings().catch(() => {
      if (Platform.OS === 'ios') {
        Linking.openURL('App-Prefs:root')
      }
    })
  }
}

const channelNameMaxMembers = 3
const channelNameEllipsisLength = 32
const maxUnreadMessageCount = 99

export const ellipsis = (s: string, len: number) => {
  return s.length > len ? s.substring(0, len) + '..' : s
}
export const createChannelName = (channel: GroupChannel) => {
  if (channel.name === 'Group Channel' || channel.name.length === 0) {
    const nicknames = channel.members.map(m => m.nickname)
    if (nicknames.length > channelNameMaxMembers) {
      return ellipsis(
        `${nicknames.slice(0, channelNameMaxMembers + 1).join(', ')} and ${
          nicknames.length - channelNameMaxMembers
        } others`,
        channelNameEllipsisLength,
      )
    } else {
      return ellipsis(`${nicknames.join(', ')}`, channelNameEllipsisLength)
    }
  }
  return ellipsis(channel.name, channelNameEllipsisLength)
}

export const createUnreadMessageCount = (channel: GroupChannel) => {
  if (channel.unreadMessageCount > maxUnreadMessageCount) {
    return `${maxUnreadMessageCount}+`
  } else {
    return `${channel.unreadMessageCount}`
  }
}
