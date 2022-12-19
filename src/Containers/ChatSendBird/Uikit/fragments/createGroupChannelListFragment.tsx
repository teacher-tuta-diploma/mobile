import React, { useEffect } from 'react'
import { AppState } from 'react-native'

import { useGroupChannelList } from '@sendbird/uikit-chat-hooks'
import { Logger, PASS, useFreshCallback } from '@sendbird/uikit-utils'

import StatusComposition from '../components/StatusComposition'
import GroupChannelPreviewContainer from '../containers/GroupChannelPreviewContainer'
import createGroupChannelListModule from '../domain/groupChannelList/module/createGroupChannelListModule'
import type {
  GroupChannelListFragment,
  GroupChannelListModule,
  GroupChannelListProps,
} from '../domain/groupChannelList/types'
import { useSendbirdChat } from '../hooks/useContext'

const createGroupChannelListFragment = (
  initModule?: Partial<GroupChannelListModule>,
): GroupChannelListFragment => {
  const GroupChannelListModule = createGroupChannelListModule(initModule)
  return ({
    TypeSelectorHeader,
    onPressChannel,
    onPressCreateChannel,
    queryCreator,
    collectionCreator,
    renderGroupChannelPreview,
    skipTypeSelection = false,
    flatListProps = {},
    menuItemCreator = PASS,
  }) => {
    const { sdk, currentUser, features, markAsDeliveredWithChannel } =
      useSendbirdChat()

    const { groupChannels, next, loading } = useGroupChannelList(
      sdk,
      currentUser?.userId,
      {
        queryCreator,
        collectionCreator,
        enableCollectionWithoutLocalCache: !queryCreator,
      },
    )
    console.log(
      '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    console.log(
      '🛠 LOG: 🚀 --> ~ file: createGroupChannelListFragment.tsx ~ line 36 ~ groupChannels',
      groupChannels,
    )
    console.log(
      '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )

    if (features.deliveryReceiptEnabled) {
      useEffect(() => {
        const listener = AppState.addEventListener('change', status => {
          if (status === 'active') {
            groupChannels.forEach(markAsDeliveredWithChannel)
          }
        })
        return () => listener.remove()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    }

    const _renderGroupChannelPreview: GroupChannelListProps['List']['renderGroupChannelPreview'] =
      useFreshCallback((channel, onLongPressChannel) => {
        if (renderGroupChannelPreview) {
          return renderGroupChannelPreview(channel, onLongPressChannel)
        }
        return (
          <GroupChannelPreviewContainer
            channel={channel}
            onPress={() => onPressChannel(channel)}
            onLongPress={() => onLongPressChannel()}
          />
        )
      })

    if (!currentUser) {
      Logger.log(
        'Cannot render GroupChannelListFragment, please connect using `useConnection()` hook first',
      )
      return null
    }

    return (
      <GroupChannelListModule.Provider>
        <GroupChannelListModule.Header />
        <StatusComposition
          loading={loading}
          LoadingComponent={<GroupChannelListModule.StatusLoading />}
        >
          <GroupChannelListModule.List
            menuItemCreator={menuItemCreator}
            renderGroupChannelPreview={_renderGroupChannelPreview}
            groupChannels={groupChannels}
            onLoadNext={next}
            flatListProps={{
              ListEmptyComponent: <GroupChannelListModule.StatusEmpty />,
              contentContainerStyle: { flexGrow: 1 },
              ...flatListProps,
            }}
          />
        </StatusComposition>
        <GroupChannelListModule.TypeSelector
          skipTypeSelection={skipTypeSelection}
          Header={TypeSelectorHeader}
          onSelectType={onPressCreateChannel}
        />
      </GroupChannelListModule.Provider>
    )
  }
}

export default createGroupChannelListFragment
