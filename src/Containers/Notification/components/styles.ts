import { useTheme } from '@/Hooks'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

export const useStylesNotification = () => {
  const { Colors } = useTheme()

  return useMemo(
    () =>
      StyleSheet.create({
        inPressItem: {
          borderBottomWidth: 1,
          borderLeftWidth: 4,
          borderLeftColor: Colors.primary,
          backgroundColor: Colors.bottomTab,
          borderBottomColor: Colors.grey4,
        },
        outPressItem: {
          borderBottomWidth: 1,
          borderLeftWidth: 4,
          borderLeftColor: 'rgba(0,0,0,0)',
          borderBottomColor: Colors.grey4,
        },
      }),
    [Colors],
  )
}
