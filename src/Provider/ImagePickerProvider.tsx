import { timeout } from '@/Config/utils'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import MultipleImagePicker, {
  Results,
} from '@baronha/react-native-multiple-image-picker'
import React, { useCallback, useMemo, useState } from 'react'
import ImagePicker, { Image } from 'react-native-image-crop-picker'

export type ImagePickerT = {
  selectedImage?: Image
  onChoiceAvatar?: () => Promise<Results | undefined>
  changeSelectedImage: (img?: Image) => void
}

export const ImagePickerContext = React.createContext<ImagePickerT>({})

const ImagePickerProvider = ({ children }: { children: React.ReactNode }) => {
  const loading = useLoadingGlobal()
  const [selectedImage, setSelectedImage] = useState<Image>()

  const changeSelectedImage = useCallback((img?: Image) => {
    setSelectedImage(img)
  }, [])

  const onChoiceAvatar = useCallback(async () => {
    try {
      loading.toogleLoading?.(true)
      const response = await MultipleImagePicker.openPicker({
        haveThumbnail: true,
        usedCameraButton: false,
        singleSelectedMode: true,
      })
      const image: Results = response as any
      console.log('response: ', image)
      await timeout(1000)
      const img = await ImagePicker.openCropper({
        path: image.path,
        width: image.width / 10,
        height: image.height / 10,
        mediaType: 'photo',
        freeStyleCropEnabled: true,
      })
      console.log('crop img: ', img)
      setSelectedImage(img)
      return {
        ...image,
        ...img,
      }
    } catch (e: any) {
      console.log(e.toString())
    } finally {
      loading.toogleLoading?.(false)
    }
  }, [loading])

  const contextValue = useMemo<ImagePickerT>(
    () => ({
      selectedImage,
      onChoiceAvatar,
      changeSelectedImage,
    }),
    [changeSelectedImage, onChoiceAvatar, selectedImage],
  )
  return (
    <ImagePickerContext.Provider value={contextValue}>
      {children}
    </ImagePickerContext.Provider>
  )
}

export default ImagePickerProvider
