import { useTheme } from '@/Hooks'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

export const useStylesMyOrder = () => {
  const { MetricsSizes } = useTheme()

  return useMemo(
    () =>
      StyleSheet.create({
        action: {
          position: 'absolute',
          bottom: -MetricsSizes.tiny * 1.5,
          right: 0,
        },
        popup: {
          position: 'absolute',
          top: MetricsSizes.large * 2,
        },
      }),
    [MetricsSizes.large, MetricsSizes.tiny],
  )
}
