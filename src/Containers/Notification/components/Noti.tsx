import React, { useCallback } from 'react'
import { useTheme } from '@/Hooks'
import BigList from 'react-native-big-list'
import NotiItem from './NotiItem'
import NoData from './NoData'
import i18next from 'i18next'
import { NotificationT } from '@/Store/Message/type'
import { useHandleGetListNotificationQuery } from '@/Services/modules/users'

type Props = {
  data?: NotificationT[]
}
const Noti = ({ data }: Props) => {
  const { MetricsSizes } = useTheme()
  const propsHandleGetNotifications = useHandleGetListNotificationQuery({})

  const onRefresh = useCallback(() => {
    propsHandleGetNotifications.refetch()
  }, [propsHandleGetNotifications])

  return (
    <BigList
      data={data ?? []}
      itemHeight={MetricsSizes.large * 1.3}
      renderItem={({ item }) => <NotiItem item={item} />}
      renderEmpty={() => <NoData title={i18next.t('Notification.noNoti')} />}
      refreshing={propsHandleGetNotifications.isFetching}
      onRefresh={onRefresh}
    />
  )
}

export default Noti
