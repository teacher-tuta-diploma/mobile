import { useTheme } from '@/Hooks'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

export const useStylesEditProfile = () => {
  const { MetricsSizes } = useTheme()

  return useMemo(
    () =>
      StyleSheet.create({
        input: {
          borderWidth: 1,
          paddingVertical: MetricsSizes.tiny,
          borderRadius: MetricsSizes.tiny,
        },
      }),
    [MetricsSizes],
  )
}
