import { Text } from 'react-native'
import React, { useCallback } from 'react'
import { Touchable } from '@/Components/Touchable'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import { scale } from 'react-native-utils-scale'
import { useAppDispatch, useAppSelector } from '@/Hooks/useApp'
import { setReceivedNotification } from '@/Store/Message'

const PopupMessage = () => {
  const { Colors, Images, Icons, MetricsSizes, Fonts } = useTheme()
  const dispatch = useAppDispatch()
  const { notificationPusherData } = useAppSelector(state => state.message)
  const onResetNotification = useCallback(() => {
    dispatch(
      setReceivedNotification({
        notificationPusherData: undefined,
      }),
    )
  }, [dispatch])
  return (
    <>
      <Container>
        <Text style={[Fonts.textTiny, { color: Colors.grey9 }]}>
          Tin nhắn mới !
        </Text>
      </Container>
      <Touchable pt={MetricsSizes.tiny} flexDr="row" ai="center">
        <Image
          br={scale(15)}
          source={Images.user}
          w={scale(30)}
          h={scale(30)}
        />
        <Container jc="center" pl={MetricsSizes.tiny}>
          <Text style={[Fonts.textSmallBold, { color: Colors.grey9 }]}>
            {notificationPusherData?.title}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              Fonts.textTiny,
              {
                color: Colors.grey9,
                maxWidth: MetricsSizes.deviceWidth - scale(120),
              },
            ]}
          >
            {notificationPusherData?.body}
            {notificationPusherData?.body}
          </Text>
        </Container>
      </Touchable>
      <Container position="absolute" right={scale(10)} top={scale(10)}>
        <Touchable onPress={onResetNotification}>
          <Image
            br={scale(15)}
            source={Icons.cancel}
            w={MetricsSizes.small}
            h={MetricsSizes.small}
          />
        </Touchable>
      </Container>
    </>
  )
}

export default PopupMessage
