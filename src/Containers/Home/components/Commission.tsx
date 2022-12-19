import { StyleSheet, Text } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Video from 'react-native-video'
import Image from '@/Components/Image'
import { useHandleGetVideoConfigQuery } from '@/Services/modules/users'
import { Touchable } from '@/Components/Touchable'
import WebView from 'react-native-webview'

const Commission = () => {
  const { Gutters, Fonts, Images, Colors, MetricsSizes, FontFamily } =
    useTheme()
  const [isPlay, setIsPlay] = useState(true)
  const videoRef = useRef<Video | null>(null)
  const timeOut: { current: NodeJS.Timeout | null } = useRef(null)
  const [visible, setVisivle] = useState(true)
  const propHandleGetVideoConfig = useHandleGetVideoConfigQuery({})

  /**
   * đặt thời gian 2s sau khi play video sẽ ẩn button giữa đi
   * nếu đã setTimeout trước đó thì clear đi
   */
  const setHiden = useCallback(() => {
    setVisivle(true)
    if (timeOut.current) {
      clearTimeout(timeOut.current)
    }
    timeOut.current = setTimeout(() => {
      setVisivle(false)
    }, 2000)
  }, [])

  const onTogglePlay = useCallback(() => {
    if (isPlay) {
      setHiden()
    }
    setIsPlay(v => !v)
  }, [isPlay, setHiden])

  const linkYoutobe = useMemo(
    () =>
      propHandleGetVideoConfig.data?.data[0].url?.replace(
        'watch?v=',
        'embed/',
      ) + '/?rel=0&autoplay=0&showinfo=0&controls=0',
    [propHandleGetVideoConfig.data?.data],
  )

  return (
    <Container style={[Gutters.smallHMargin, Gutters.tinyVMargin]}>
      <Text
        style={[
          Fonts.textSmall,
          Gutters.tinyVMargin,
          { color: Colors.note, fontFamily: FontFamily.NunitoBold },
        ]}
      >
        Cam kết của Taxi tải Thành Hưng
      </Text>
      {propHandleGetVideoConfig.data?.data[0].url.includes('youtube') ? (
        <Container
          style={{
            width: MetricsSizes.deviceWidth - MetricsSizes.small * 2,
            height: MetricsSizes.deviceHeight / 3,
          }}
        >
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri: linkYoutobe,
            }}
          />
        </Container>
      ) : (
        <Touchable
          onPress={() => {
            setHiden()
          }}
        >
          {propHandleGetVideoConfig.data?.data[0].url && (
            <Video
              source={{
                uri: propHandleGetVideoConfig.data?.data[0].url,
              }}
              style={{
                width: MetricsSizes.deviceWidth - MetricsSizes.small * 2,
                height: MetricsSizes.deviceHeight / 3,
              }}
              key={propHandleGetVideoConfig.data?.data[0].url}
              resizeMode="cover"
              volume={1}
              ignoreSilentSwitch={'ignore'}
              ref={videoRef}
              paused={isPlay}
              // navigator={NavigationService}
              // isFullscreen={pauseVideo}
              // paused
              // onEnterFullscreen={onFullScreen}
              // onFullscreenPlayerDidDismiss={onExitFullscreen}
              // showDuration
              // controls
              // minLoadRetryCount={2}
              // videoRef={videoRef}
              // pictureInPicture
              // poster={params.course.image}
            />
          )}
          <Container
            style={[
              styles.playpause,
              { top: MetricsSizes.deviceHeight / 3 / 2.5 },
            ]}
          >
            <Touchable onPress={onTogglePlay}>
              {isPlay ? (
                <Image
                  source={Images.pause}
                  w={MetricsSizes.large}
                  h={MetricsSizes.large}
                  tintColor={Colors.white}
                  resizeMode="contain"
                />
              ) : (
                visible && (
                  <Image
                    source={Images.play_video}
                    w={MetricsSizes.large}
                    h={MetricsSizes.large}
                    tintColor={Colors.white}
                    resizeMode="contain"
                  />
                )
              )}
            </Touchable>
          </Container>
        </Touchable>
      )}
    </Container>
  )
}

export default Commission

const styles = StyleSheet.create({
  playpause: {
    position: 'absolute',
    alignSelf: 'center',
  },
})
