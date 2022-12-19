import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { MetricsSizes } from '@/Theme/Variables'
import { useTheme } from '@/Hooks'
import { Touchable } from '@/Components/Touchable'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const Popup = ({ children, status, tooglePopup }: any) => {
  const translateY = useSharedValue(0)

  const { Colors } = useTheme()

  const actionBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 750,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    }
  })

  const onPressOver = useCallback(() => {
    translateY.value = -1000
    setTimeout(() => {
      tooglePopup(false)
    }, 1000)
  }, [tooglePopup, translateY])

  useEffect(() => {
    if (status) {
      translateY.value = 100
    }
  }, [status, translateY])

  return status ? (
    <Touchable
      onPress={onPressOver}
      activeOpacity={1}
      bg={Colors.blurBg}
      style={styles.container}
    >
      <Animated.View style={[actionBarStyle]}>{children}</Animated.View>
    </Touchable>
  ) : null
}

export default Popup

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: MetricsSizes.deviceWidth,
    height: MetricsSizes.deviceHeight,
  },
})
