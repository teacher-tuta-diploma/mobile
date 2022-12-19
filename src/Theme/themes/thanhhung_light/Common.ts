/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { CommonParams } from '@/Theme/theme'
import { StyleSheet } from 'react-native'

export default function <C>({ Colors, MetricsSizes }: CommonParams<C>) {
  return {
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.white,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.borderInput,
        borderRadius: 10,
        height: MetricsSizes.small * 2.5,
        width: '100%',
        paddingLeft: MetricsSizes.tiny,
      },
    }),
  }
}
