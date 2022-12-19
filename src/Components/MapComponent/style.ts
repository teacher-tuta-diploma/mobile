import { useTheme } from '@/Hooks'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const useStyleMapComponent = () => {
  const { MetricsSizes, Colors } = useTheme()
  const inset = useSafeAreaInsets()
  return useMemo(() => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: inset.top,
        zIndex: 1,
        width: '95%',
      },
      marker: {
        position: 'absolute',
        top: 100,
        bottom: 0,
        left: 100,
        right: 0,
        width: 10,
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        backgroundColor: 'red',
      },
      back: {
        position: 'absolute',
        bottom: MetricsSizes.regular,
        zIndex: 1,
        left: MetricsSizes.regular,
        backgroundColor: Colors.white,
        width: MetricsSizes.large,
        height: MetricsSizes.large,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: MetricsSizes.large / 2,
      },
    })

    return styles
  }, [Colors.white, MetricsSizes.large, MetricsSizes.regular, inset.top])
}
