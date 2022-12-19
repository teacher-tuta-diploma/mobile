import { ImagePickerContext } from '@/Provider/ImagePickerProvider'
import { useContext } from 'react'

const useImagePicker = () => {
  return useContext(ImagePickerContext)
}

export default useImagePicker
