import React from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'
import Container from '@/Components/Container'
import {
  createGroupChannelCreateFragment,
  createGroupChannelFragment,
  createGroupChannelListFragment,
  useConnection,
  useSendbirdChat,
} from '@/Containers/ChatSendBird/Uikit'

const GroupChannelListFragment = createGroupChannelListFragment()
const GroupChannelCreateFragment = createGroupChannelCreateFragment()
const GroupChannelFragment = createGroupChannelFragment()

export const GroupChannelListScreen = () => {
  const navigation = useNavigation<any>()
  return (
    <GroupChannelListFragment
      onPressCreateChannel={channelType => {
        // Navigate to GroupChannelCreate function.
        navigation.navigate('GroupChannelCreate', { channelType })
      }}
      onPressChannel={channel => {
        // Navigate to GroupChannel function.
        navigation.navigate('GroupChannel', {
          serializedChannel: channel.serialize(),
        })
      }}
      children={
        <Container>
          <Text>ad</Text>
        </Container>
      }
    />
  )
}

export const GroupChannelCreateScreen = () => {
  const navigation = useNavigation<any>()

  return (
    <GroupChannelCreateFragment
      onCreateChannel={async channel => {
        // Navigate to GroupChannel function.
        navigation.replace('GroupChannel', {
          serializedChannel: channel.serialize(),
        })
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack()
      }}
    />
  )
}

export const GroupChannelScreen = () => {
  const navigation = useNavigation<any>()
  const { params } = useRoute<any>()

  const { sdk } = useSendbirdChat()
  const channel = sdk.groupChannel.buildGroupChannelFromSerializedData(
    params.serializedChannel,
  )

  return (
    <GroupChannelFragment
      channel={channel}
      onChannelDeleted={() => {
        // Navigate to GroupChannelList function.
        navigation.navigate('GroupChannelList')
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack()
      }}
      onPressHeaderRight={() => {
        // Navigate to GroupChannelSettings function.
        navigation.navigate('GroupChannelSettings', {
          serializedChannel: params.serializedChannel,
        })
      }}
    />
  )
}

export const SignInScreen = () => {
  const { connect } = useConnection()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        style={{
          width: 120,
          height: 30,
          backgroundColor: '#742DDD',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={async () => {
          try {
            const data = await connect('longnn1', { nickname: 'longnn' })
            console.log(
              '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------🛠 LOG: 🚀 -->',
            )
            console.log(
              '🛠 LOG: 🚀 --> ~ file: ChatComponent.tsx ~ line 100 ~ onPress={ ~ data',
              data,
            )
            console.log(
              '🛠 LOG: 🚀 --> ----------------------------------------------------------------------------🛠 LOG: 🚀 -->',
            )
          } catch (error) {
            console.log(
              '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
            )
            console.log(
              '🛠 LOG: 🚀 --> ~ file: ChatComponent.tsx ~ line 112 ~ onPress={ ~ error',
              error,
            )
            console.log(
              '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
            )
          }
        }}
      >
        <Text>{'Sign in'}</Text>
      </Pressable>
    </View>
  )
}
