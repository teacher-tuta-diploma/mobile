import { useTheme } from '@/Hooks'
import React, { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import Container from '../Container'

const Ring = ({ delay }: any) => {
  const ring = useSharedValue(0)

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    }
  })
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false,
      ),
    )
  }, [delay, ring])
  return <Animated.View style={[styles.ring, ringStyle]} />
}

export default function AnimatedRing() {
  const { Fonts, Colors, MetricsSizes } = useTheme()

  return (
    <Container
      w={MetricsSizes.large * 2}
      h={MetricsSizes.large * 2}
      ai="center"
      jc="center"
      flexDr="column"
    >
      <Ring delay={0} />
      <Ring delay={500} />
      <Ring delay={1000} />
      <Ring delay={2000} />
      <Container bg={Colors.primary} style={styles.driver}>
        <Text style={[Fonts.textRegular]}>tx</Text>
      </Container>
    </Container>
  )
}

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'tomato',
    borderWidth: 5,
    alignItems: 'center',
  },
  driver: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
