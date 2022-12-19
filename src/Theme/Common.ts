/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import { CommonParams } from './theme'

export default function <C>({
  Colors,
  MetricsSizes,
  ...args
}: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, MetricsSizes, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
      },
      shadowContainer: {
        shadowColor: '#000',
        backgroundColor: Colors.white,
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.36,
        shadowRadius: 3,
        elevation: 11,
      },
      bottomSheetShadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: -5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 5,
        elevation: 11,
      },
    }),
  }
}
