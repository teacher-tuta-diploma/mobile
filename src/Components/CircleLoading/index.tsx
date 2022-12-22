import React, { useEffect } from 'react'
import Container from '../Container'
import Image from '../Image'
import { useTheme } from '@/Hooks'
import { scale } from 'react-native-utils-scale'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

const CircleLoading = () => {
  const rotation1 = useSharedValue(0)
  const rotation2 = useSharedValue(0)
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withRepeat(
            withTiming(`${rotation1.value}deg`, {
              duration: 3000,
              easing: Easing.linear,
            }),
            -1, // lặp vô hạn
            true,
          ),
        },
      ],
    }
  })

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withRepeat(
            withTiming(`${rotation2.value}deg`, {
              duration: 3000,
              easing: Easing.linear,
            }),
            -1, // lặp vô hạn
            true,
          ),
        },
      ],
    }
  })
  const { MetricsSizes, Images } = useTheme()

  useEffect(() => {
    rotation1.value = 360
    rotation2.value = -360
  }, [rotation1, rotation2])

  return (
    <Container>
      <Animated.View
        style={[animatedStyle1, { width: scale(128), height: scale(48) }]}
      >
        <Image
          source={Images.elipse1}
          w={scale(128)}
          h={scale(48)}
          resizeMode="contain"
        />
      </Animated.View>
      <Container
        style={{
          position: 'absolute',
          top: MetricsSizes.tiny / 2,
          left: MetricsSizes.tiny / 2,
        }}
      >
        <Animated.View
          style={[
            animatedStyle2,
            {
              width: scale(118),
              height: scale(38),
            },
          ]}
        >
          <Image
            source={Images.elipse1}
            w={scale(118)}
            h={scale(38)}
            resizeMode="contain"
          />
        </Animated.View>
      </Container>
    </Container>
  )
}

export default CircleLoading
