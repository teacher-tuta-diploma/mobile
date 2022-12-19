import React, { createContext, useCallback } from 'react'

import {
  useActiveGroupChannel,
  useChannelHandler,
} from '@sendbird/uikit-chat-hooks'
import {
  useActionMenu,
  useAlert,
  useBottomSheet,
  usePrompt,
  useToast,
} from '@sendbird/uikit-react-native-foundation'
import {
  NOOP,
  SendbirdBaseChannel,
  SendbirdGroupChannel,
  SendbirdGroupChannelUpdateParams,
  isDifferentChannel,
  useForceUpdate,
  useUniqId,
} from '@sendbird/uikit-utils'

import ProviderLayout from '../../../components/ProviderLayout'
import {
  useLocalization,
  usePlatformService,
  useSendbirdChat,
} from '../../../hooks/useContext'
import SBUError from '../../../libs/SBUError'
import SBUUtils from '../../../libs/SBUUtils'
import type {
  GroupChannelSettingsContextsType,
  GroupChannelSettingsModule,
} from '../types'

export const GroupChannelSettingsContexts: GroupChannelSettingsContextsType = {
  Fragment: createContext({
    channel: {} as SendbirdGroupChannel,
    headerTitle: '',
    headerRight: '',
    onPressHeaderRight: NOOP,
  }),
}

const HOOK_NAME = 'GroupChannelSettingsContextsProvider'
export const GroupChannelSettingsContextsProvider: GroupChannelSettingsModule['Provider'] =
  ({ children, channel }) => {
    const uniqId = useUniqId(HOOK_NAME)
    const forceUpdate = useForceUpdate()
    const { STRINGS } = useLocalization()
    const { sdk } = useSendbirdChat()
    const { fileService } = usePlatformService()
    const { alert } = useAlert()

    const { activeChannel, setActiveChannel } = useActiveGroupChannel(
      sdk,
      channel,
    )

    const onChannelChanged = (channel: SendbirdBaseChannel) => {
      if (
        isDifferentChannel(channel, activeChannel) ||
        !channel.isGroupChannel()
      ) {
        return
      }
      setActiveChannel(channel)
      forceUpdate()
    }

    useChannelHandler(sdk, `${HOOK_NAME}_${uniqId}`, {
      onChannelChanged: onChannelChanged,
      onChannelFrozen: onChannelChanged,
      onChannelUnfrozen: onChannelChanged,
    })

    const toast = useToast()
    const { openSheet } = useBottomSheet()
    const { openPrompt } = usePrompt()
    const { openMenu } = useActionMenu()

    const updateChannel = useCallback(
      async (params: SendbirdGroupChannelUpdateParams) => {
        const updatedChannel = await activeChannel.updateChannel(params)
        setActiveChannel(updatedChannel)
        forceUpdate()
      },
      [activeChannel, forceUpdate, setActiveChannel],
    )

    const changeChannelName = useCallback(() => {
      openPrompt({
        title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_TITLE,
        submitLabel:
          STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_OK,
        placeholder:
          STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_PLACEHOLDER,
        defaultValue: activeChannel.name,
        onSubmit: channelName => updateChannel({ name: channelName }),
      })
    }, [
      openPrompt,
      STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_TITLE,
      STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_OK,
      STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_PLACEHOLDER,
      activeChannel.name,
      updateChannel,
    ])

    const changeChannelImage = useCallback(() => {
      openMenu({
        title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE_MENU_TITLE,
        menuItems: [
          {
            title:
              STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE_MENU_CAMERA,
            onPress: async () => {
              const file = await fileService.openCamera({
                mediaType: 'photo',
                onOpenFailure: error => {
                  if (error.code === SBUError.CODE.ERR_PERMISSIONS_DENIED) {
                    alert({
                      title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                      message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(
                        'camera',
                        'UIKitSample',
                      ),
                      buttons: [
                        {
                          text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                          onPress: () => SBUUtils.openSettings(),
                        },
                      ],
                    })
                  } else {
                    toast.show(STRINGS.TOAST.OPEN_CAMERA_ERROR, 'error')
                  }
                },
              })
              if (!file) {
                return
              }

              await updateChannel({ coverImage: file })
            },
          },
          {
            title:
              STRINGS.GROUP_CHANNEL_SETTINGS
                .DIALOG_CHANGE_IMAGE_MENU_PHOTO_LIBRARY,
            onPress: async () => {
              const files = await fileService.openMediaLibrary({
                selectionLimit: 1,
                mediaType: 'photo',
                onOpenFailure: error => {
                  if (error.code === SBUError.CODE.ERR_PERMISSIONS_DENIED) {
                    alert({
                      title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                      message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(
                        'device storage',
                        'UIKitSample',
                      ),
                      buttons: [
                        {
                          text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                          onPress: () => SBUUtils.openSettings(),
                        },
                      ],
                    })
                  } else {
                    toast.show(STRINGS.TOAST.OPEN_PHOTO_LIBRARY_ERROR, 'error')
                  }
                },
              })
              if (!files || !files[0]) {
                return
              }

              await updateChannel({ coverImage: files[0] })
            },
          },
        ],
      })
    }, [
      STRINGS.DIALOG,
      STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE_MENU_CAMERA,
      STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE_MENU_PHOTO_LIBRARY,
      STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE_MENU_TITLE,
      STRINGS.TOAST.OPEN_CAMERA_ERROR,
      STRINGS.TOAST.OPEN_PHOTO_LIBRARY_ERROR,
      alert,
      fileService,
      openMenu,
      toast,
      updateChannel,
    ])

    const onPressHeaderRight = useCallback(() => {
      openSheet({
        sheetItems: [
          {
            title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME,
            onPress: changeChannelName,
          },
          {
            title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE,
            onPress: changeChannelImage,
          },
        ],
      })
    }, [
      STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE,
      STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME,
      changeChannelImage,
      changeChannelName,
      openSheet,
    ])

    return (
      <ProviderLayout>
        <GroupChannelSettingsContexts.Fragment.Provider
          value={{
            channel: activeChannel,
            headerTitle: STRINGS.GROUP_CHANNEL_SETTINGS.HEADER_TITLE,
            headerRight: STRINGS.GROUP_CHANNEL_SETTINGS.HEADER_RIGHT,
            onPressHeaderRight,
          }}
        >
          {children}
        </GroupChannelSettingsContexts.Fragment.Provider>
      </ProviderLayout>
    )
  }
