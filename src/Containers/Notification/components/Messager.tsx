import React, { useCallback, useEffect } from 'react'

import {
  createGroupChannelListModule,
  createGroupChannelModule,
  GroupChannelListProps,
  StatusComposition,
  useSendbirdChat,
} from '@/Containers/ChatSendBird/Uikit'
import { useGroupChannelList } from '@sendbird/uikit-chat-hooks'
import Container from '@/Components/Container'
import { AppState, RefreshControl } from 'react-native'
import { navigate } from '@/Navigators/utils'
import { GroupChannel } from '@sendbird/chat/groupChannel'
import ChannelItem from './ChannelItem'
import { PASS, useFreshCallback } from '@sendbird/uikit-utils'

const Messager = () => {
  // const { MetricsSizes } = useTheme()
  const { sdk, currentUser, markAsDeliveredWithChannel } = useSendbirdChat()
  const { groupChannels, next, loading, refresh, refreshing } =
    useGroupChannelList(sdk, currentUser?.userId)
  const GroupChannelListModule = createGroupChannelListModule()

  const menuItemCreator = PASS
  const GroupChannelModule = createGroupChannelModule()

  const onPressChannel = useCallback((item: GroupChannel) => {
    console.log(
      '🛠 LOG: 🚀 --> --------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    console.log(
      '🛠 LOG: 🚀 --> ~ file: Messager.tsx:29 ~ onPressChannel ~ item',
      item,
    )
    console.log(
      '🛠 LOG: 🚀 --> --------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    navigate('ChatScreen', {
      serializedChannel: item.serialize(),
    })
  }, [])

  useEffect(() => {
    const listener = AppState.addEventListener('change', status => {
      if (status === 'active') {
        groupChannels.forEach(markAsDeliveredWithChannel)
      }
    })
    return () => listener.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const _renderGroupChannelPreview: GroupChannelListProps['List']['renderGroupChannelPreview'] =
    useFreshCallback((channel, _) => {
      return <ChannelItem onPress={onPressChannel} item={channel} />
    })

  return (
    <GroupChannelListModule.Provider>
      <Container flex={1}>
        <StatusComposition
          loading={loading}
          LoadingComponent={<GroupChannelModule.StatusLoading />}
        >
          <GroupChannelListModule.List
            menuItemCreator={menuItemCreator}
            renderGroupChannelPreview={_renderGroupChannelPreview}
            groupChannels={groupChannels}
            onLoadNext={next}
            flatListProps={{
              ListEmptyComponent: <GroupChannelListModule.StatusEmpty />,
              contentContainerStyle: { flexGrow: 1 },
              bounces: true,
              refreshControl: (
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              ),
            }}
          />
        </StatusComposition>
      </Container>
    </GroupChannelListModule.Provider>
  )
}

export default Messager
