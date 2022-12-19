import {
  GroupChannelFilter,
  GroupChannelListOrder,
} from '@sendbird/chat/groupChannel'
import {
  useAppFeatures,
  UseGroupChannelList,
  UseGroupChannelListOptions,
} from '@sendbird/uikit-chat-hooks'
import {
  SendbirdChatSDK,
  useFreshCallback,
  confirmAndMarkAsDelivered,
  useAsyncEffect,
  SendbirdGroupChannelCollection,
} from '@sendbird/uikit-utils'
import { useEffect, useRef } from 'react'
import { useGroupChannelListReducer } from './reducer'

const createGroupChannelListCollection = (
  sdk: SendbirdChatSDK,
  collectionCreator: UseGroupChannelListOptions['collectionCreator'],
) => {
  const passedCollection = collectionCreator?.()
  if (passedCollection) {
    return passedCollection
  }

  const filter = new GroupChannelFilter()
  filter.includeEmpty = false

  return sdk.groupChannel.createGroupChannelCollection({
    filter,
    limit: 20,
    order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
  })
}

export const useGroupChannelListWithCollection: UseGroupChannelList = (
  sdk,
  userId,
  options,
) => {
  const { deliveryReceiptEnabled } = useAppFeatures(sdk)

  const collectionRef = useRef<SendbirdGroupChannelCollection>()

  const {
    loading,
    groupChannels,
    refreshing,
    setChannels,
    updateRefreshing,
    updateLoading,
  } = useGroupChannelListReducer()

  const updateChannelsAndMarkAsDelivered = (markAsDelivered: boolean) => {
    const channels = collectionRef.current?.channels ?? []
    setChannels(channels, true)
    if (markAsDelivered && deliveryReceiptEnabled) {
      channels.forEach(channel => confirmAndMarkAsDelivered(sdk, channel))
    }
  }

  const init = useFreshCallback(async (uid?: string) => {
    if (collectionRef.current) {
      collectionRef.current?.dispose()
    }

    if (uid) {
      collectionRef.current = createGroupChannelListCollection(
        sdk,
        options?.collectionCreator,
      )

      collectionRef.current?.setGroupChannelCollectionHandler({
        onChannelsAdded: () => {
          updateChannelsAndMarkAsDelivered(true)
        },
        onChannelsUpdated: () => {
          updateChannelsAndMarkAsDelivered(true)
        },
        onChannelsDeleted: () => {
          updateChannelsAndMarkAsDelivered(false)
        },
      })

      if (collectionRef.current?.hasMore) {
        await collectionRef.current.loadMore()
        updateChannelsAndMarkAsDelivered(true)
      }
    }
  })

  useEffect(() => {
    return () => {
      if (collectionRef.current) {
        collectionRef.current?.dispose()
      }
    }
  }, [])

  useAsyncEffect(async () => {
    updateLoading(true)
    await init(userId)
    updateLoading(false)
  }, [init, userId])

  // useChannelHandler(sdk, `${HOOK_NAME}_${id}`, {
  //   onUserBanned: (channel, user) => {
  //     const isMe = user.userId === userId
  //     if (isMe) {
  //       deleteChannels([channel.url])
  //     } else {
  //       updateChannelsAndMarkAsDelivered(false)
  //     }
  //   },
  // })

  const refresh = useFreshCallback(async () => {
    updateRefreshing(true)
    await init(userId)
    updateRefreshing(false)
  })

  const next = useFreshCallback(async () => {
    if (collectionRef.current?.hasMore) {
      await collectionRef.current?.loadMore()
      updateChannelsAndMarkAsDelivered(true)
    }
  })

  return {
    loading,
    groupChannels,
    refresh,
    refreshing,
    next,
  }
}
