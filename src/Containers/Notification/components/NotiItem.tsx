import { Text } from 'react-native'
import Container from '@/Components/Container'
import { Touchable } from '@/Components/Touchable'
import Image from '@/Components/Image'
import React, { useState, useMemo, useCallback } from 'react'
import { useTheme } from '@/Hooks'
import { useStylesNotification } from './styles'
import i18next from 'i18next'
import { NotificationT } from '@/Store/Message/type'
import { formatTimeDate } from '@/Config/utils'
import { navigate } from '@/Navigators/utils'
import { navigateOrder } from '@/Config/api.helper'
import { useLazyHandleGetOrderDetailQuery } from '@/Services/modules/users'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'

const NotiItem = ({ item }: { item: NotificationT }) => {
  const { Fonts, Colors, Layout, Images, MetricsSizes, Gutters } = useTheme()
  const [isPress, setIsPress] = useState(false)
  const styles = useStylesNotification()
  const loading = useLoadingGlobal()

  const style = useMemo(() => {
    if (isPress) {
      return styles.inPressItem
    } else {
      return styles.outPressItem
    }
  }, [isPress, styles])

  const [handleGetOrderDetail] = useLazyHandleGetOrderDetailQuery()

  const getOrderDetail = useCallback(async () => {
    if (item.content.code) {
      loading?.toogleLoading?.(true, 'redirectOrder')
      await handleGetOrderDetail({
        orderCode: item.content.code,
        callback(response) {
          navigateOrder(response?.data, navigate)
        },
      })
      loading?.toogleLoading?.(false, 'redirectOrder')
    }
  }, [handleGetOrderDetail, item.content.code, loading])

  return (
    <Touchable
      style={[Layout.rowHCenter, Gutters.tinyHPadding, style]}
      onPressIn={() => setIsPress(true)}
      onPressOut={() => setIsPress(false)}
      onPress={getOrderDetail}
      activeOpacity={isPress ? 0.5 : 1}
      flex={1}
    >
      <Container flexDr="row">
        <Image
          source={Images.self_select_car}
          w={MetricsSizes.tiny * 2}
          h={MetricsSizes.tiny * 2}
          resizeMode="contain"
        />
        <Container ml={MetricsSizes.tiny} flex={1}>
          <Text style={[Fonts.textSmallBold, { color: Colors.black }]}>
            {item.title}
          </Text>
          <Text
            style={[Fonts.textTiny, { color: Colors.black }]}
          >{`${formatTimeDate(new Date(item.createdAt))} . ${i18next.t(
            'Notification.shipment',
          )}: ${item.content.code}`}</Text>
        </Container>
      </Container>
    </Touchable>
  )
}

export default NotiItem
