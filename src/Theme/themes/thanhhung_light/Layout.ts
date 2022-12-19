import { ThemeVariables } from '@/Theme/theme'
import { StyleSheet } from 'react-native'

export default function ({}: ThemeVariables) {
  return StyleSheet.create({
    /* Column Layouts */

    /* Row Layouts */

    /* Default Layouts */

    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    fullSize: {
      height: '100%',
      width: '100%',
    },
    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    /* Operation Layout */
    mirror: {
      transform: [{ scaleX: -1 }],
    },
    rotate90: {
      transform: [{ rotate: '90deg' }],
    },
    rotate90Inverse: {
      transform: [{ rotate: '-90deg' }],
    },
  })
}
