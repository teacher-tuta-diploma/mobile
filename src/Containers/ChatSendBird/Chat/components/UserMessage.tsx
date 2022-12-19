import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SendbirdUserMessage } from '@sendbird/uikit-utils'
import {
  URLParsedText,
  useUIKitTheme,
  Text,
} from '@sendbird/uikit-react-native-foundation'

import { MessageRendererInterface } from '../../Uikit/components/MessageRenderer'
import { useTheme } from '@/Hooks'
export type UserMessageProps = MessageRendererInterface<SendbirdUserMessage>

const UserMessage = ({ variant, pressed, message }: UserMessageProps) => {
  const { Colors } = useTheme()

  const { colors } = useUIKitTheme()
  const color = colors.ui.message[variant][pressed ? 'pressed' : 'enabled']

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            variant === 'incoming' ? Colors.grey4 : Colors.bgInactive,
        },
      ]}
    >
      <URLParsedText body3 strict color={Colors.black}>
        {message.message}
        {Boolean(message.updatedAt) && (
          <Text body3 color={color.textEdited}>
            {'STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_EDITED_POSTFIX'}
          </Text>
        )}
      </URLParsedText>
    </View>
  )
}

export default UserMessage

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
})
