import { useTheme } from '@/Hooks'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import Loading from './components/Loading'

export type LoadingGlobalT = {
  status?: boolean
  toogleLoading?: (bool: boolean, nameSpace?: string) => void
}

export const LoadingGlobalContext = React.createContext<LoadingGlobalT>({})

const LoadingGlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { MetricsSizes } = useTheme()

  const [status, setStatus] = useState(false)

  const nameSpaceRef = useRef<string | undefined>('')
  const opacity = useSharedValue(0)

  const toogleLoading = useCallback(
    (bool: boolean, nameSpace?: string) => {
      opacity.value = bool ? 1 : 0

      setTimeout(
        () => {
          setStatus((prevState: boolean) => {
            if (!prevState) {
              nameSpaceRef.current = nameSpace
            } else {
              if (nameSpaceRef.current === nameSpace) {
                return bool
              }
            }
            return bool
          })
        },
        bool ? 0 : 1100,
      )
    },
    [opacity],
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        0,
        withTiming(opacity.value, {
          duration: 1000,
        }),
      ),
    }
  })

  const contextValue = useMemo<LoadingGlobalT>(
    () => ({
      status,
      toogleLoading,
    }),
    [status, toogleLoading],
  )

  return (
    <LoadingGlobalContext.Provider value={contextValue}>
      {children}
      {status ? (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: MetricsSizes.deviceWidth,
              height: MetricsSizes.deviceHeight,
            },
            animatedStyle,
          ]}
        >
          <Loading />
        </Animated.View>
      ) : null}
    </LoadingGlobalContext.Provider>
  )
}

export default LoadingGlobalProvider
