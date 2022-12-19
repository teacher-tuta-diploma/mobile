import { StyleSheet } from 'react-native'
import { CommonParams } from '@/Theme/theme'

export default function <C>({ Colors, Layout }: CommonParams<C>) {
  const base = {
    ...Layout.center,
    height: 58,
    backgroundColor: Colors.transparent,
  }
  const rounded = {
    ...base,
    borderRadius: 10,
  }

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.white,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.white,
    },
  })
}
