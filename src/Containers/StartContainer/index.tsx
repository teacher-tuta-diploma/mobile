import { Text, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Image from '@/Components/Image'
import { scale } from 'react-native-utils-scale'
import { setIsStart } from '@/Store/Global'
import { useAppDispatch } from '@/Hooks/useApp'
import CircleLoading from '@/Components/CircleLoading'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
const StartContainer = () => {
  const { MetricsSizes, FontSize, Images, Colors } = useTheme()
  const inset = useSafeAreaInsets()
  const dispatch = useAppDispatch()
  const loading = useLoadingGlobal()

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setIsStart({
          isStart: false,
        }),
      )
    }, 2000)
  }, [dispatch, loading])

  return (
    <ImageBackground
      style={[
        { width: MetricsSizes.deviceWidth, height: MetricsSizes.deviceHeight },
        { paddingTop: inset.top + 5, paddingBottom: inset.bottom },
      ]}
      resizeMode="cover"
      source={Images.background_start}
    >
      <Container mh={MetricsSizes.small} flex={10 / 10} jc="flex-end">
        <Image
          source={Images.KMAuth}
          w={scale(128)}
          h={scale(48)}
          resizeMode="contain"
        />
        <Container mt={MetricsSizes.tiny} mb={MetricsSizes.regular}>
          <Text style={{ color: Colors.white, fontSize: FontSize.tiny }}>
            An toàn - Tiện lợi - Hiện đại KMAuthen là ứng dụng được phát triển
            với mục tiêu cung cấp một môi trường xác thực đa nhân tố an toàn dựa
            trên nền tảng công nghệ blockchain.
          </Text>
        </Container>
        <Container ai="center">
          <CircleLoading />
        </Container>
      </Container>
    </ImageBackground>
  )
}

export default StartContainer

// const styles = StyleSheet.create({})
