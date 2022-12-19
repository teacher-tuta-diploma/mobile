import { ScrollView, Text } from 'react-native'
import React, { useMemo } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import PromotionItem from './Item'
import { useHandleGetPromotionListQuery } from '@/Services/modules/users'

const Promotion = () => {
  const { Gutters, Fonts, Colors, FontFamily } = useTheme()
  const propsHandleGetPromotionList = useHandleGetPromotionListQuery({
    page: 1,
    limit: 1000,
    search: 'homepage:=:true',
  })
  const data = useMemo(
    () =>
      propsHandleGetPromotionList.data?.data?.map(v => ({
        name: v.name,
        url: v.bannerUrl,
      })),
    [propsHandleGetPromotionList.data?.data],
  )
  return (
    <Container style={[Gutters.smallLMargin]}>
      <Text
        style={[
          Fonts.textSmall,
          Gutters.tinyVMargin,
          { color: Colors.note, fontFamily: FontFamily.NunitoBold },
        ]}
      >
        Ưu đãi dành cho bạn
      </Text>
      {/* <VideoPlayer
        source={{
          uri: 'https://minio.hisoft.com.vn/recbook-education/test_mov.mov',
        }}
        key={videoUrl}
        navigator={NavigationService}
        isFullscreen={pauseVideo}
        paused
        onEnterFullscreen={onFullScreen}
        onFullscreenPlayerDidDismiss={onExitFullscreen}
        showDuration
        // controls
        minLoadRetryCount={2}
        videoRef={videoRef}
        pictureInPicture
        poster={params.course.image}
      /> */}
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {data?.map((value, index) => {
          return (
            <PromotionItem
              key={index}
              {...{
                image: value.url,
                title: value.name,
              }}
            />
          )
        })}
      </ScrollView>
    </Container>
  )
}

export default Promotion
