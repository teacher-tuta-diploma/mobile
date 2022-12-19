import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

export const useStyleContainer = () => {
  return useMemo(() => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
    })

    return styles
  }, [])
}
