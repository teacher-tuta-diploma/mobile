import React, { useCallback, useEffect } from 'react'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'
import { Touchable } from '@/Components/Touchable'
import useImagePicker from '@/Hooks/useImagePicker'
import {
  useHandleLinkFileMutation,
  useHandleUploadFileMutation,
} from '@/Services/modules/users'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { useAppSelector } from '@/Hooks/useApp'
import { alertMessage } from '@/Config/alert.helper'

type Props = {
  defaultUrl?: string
}
const Avatar = ({ defaultUrl }: Props) => {
  const { Images, Colors, MetricsSizes } = useTheme()
  const imagePicker = useImagePicker()
  const account = useAppSelector(state => state.authentication.account)
  const [handleUploadFile, propsUploadFile] = useHandleUploadFileMutation({
    fixedCacheKey: 'UploadFile',
  })
  const [handleLinkFile, propsLinkFile] = useHandleLinkFileMutation({
    fixedCacheKey: 'LinkFile',
  })
  const onChoiceAvatar = useCallback(async () => {
    const image = await imagePicker.onChoiceAvatar?.()
    if (!image) {
      return
    }
    console.log(
      '🛠 LOG: 🚀 --> ---------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    console.log(
      '🛠 LOG: 🚀 --> ~ file: Avatar.tsx ~ line 13 ~ onChoiceAvatar ~ image',
      image,
    )
    console.log(
      '🛠 LOG: 🚀 --> ---------------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    const formData = new FormData()
    formData.append('files', {
      uri: image?.path,
      type: image?.mime,
      name: image?.fileName,
    })
    formData.append('type', image?.type)
    formData.append('title', image?.fileName)
    handleUploadFile({
      file: formData,
    })
  }, [handleUploadFile, imagePicker])

  useEffect(() => {
    if (
      propsUploadFile.data &&
      propsUploadFile.status === QueryStatus.fulfilled
    ) {
      handleLinkFile({
        type: ['0'],
        userId: account.id,
        docs: [propsUploadFile.data.createdDocs[0].id],
      })
    }
  }, [account.id, handleLinkFile, propsUploadFile.data, propsUploadFile.status])

  useEffect(() => {
    if (propsLinkFile.status === QueryStatus.fulfilled && propsLinkFile.data) {
      if (propsLinkFile.data.status === 'created') {
        alertMessage('Tải ảnh lên thành công')
      }
    }
  }, [propsLinkFile.data, propsLinkFile.status])

  useEffect(() => {
    return () => {
      setTimeout(() => {
        propsUploadFile.reset()
        propsLinkFile.reset()
      }, 2000)
    }
  }, [propsLinkFile, propsUploadFile])

  return (
    <Touchable
      onPress={onChoiceAvatar}
      br={MetricsSizes.large}
      bw={1}
      bc={Colors.primary}
      h={MetricsSizes.large * 2}
      w={MetricsSizes.large * 2}
      bg={Colors.grey4}
      ai="center"
      jc="center"
      style={{ overflow: 'hidden' }}
    >
      {imagePicker.selectedImage ? (
        <Image
          source={{
            uri: imagePicker.selectedImage?.path,
          }}
          w={MetricsSizes.large * 2}
          h={MetricsSizes.large * 2}
          resizeMode="cover"
        />
      ) : defaultUrl ? (
        <Image
          source={{ uri: defaultUrl }}
          w={MetricsSizes.large * 2}
          h={MetricsSizes.large * 2}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={Images.camera}
          w={MetricsSizes.small}
          h={MetricsSizes.small}
          resizeMode="cover"
        />
      )}
    </Touchable>
  )
}

export default Avatar
