import React, { useState } from 'react'
import Header from '@/Components/Header'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import StatusActive from './components/StatusActive'
import { Touchable } from '@/Components/Touchable'
import Noti from './components/Noti'
import Messager from './components/Messager'
import { MetricsSizes } from '@/Theme/Variables'
import i18next from 'i18next'
import { useHandleGetListNotificationQuery } from '@/Services/modules/users'

const Notification = () => {
  const { Gutters, Layout } = useTheme()
  const [isNoti, setIsNoti] = useState(true)
  const propsHandleGetNotifications = useHandleGetListNotificationQuery({})
  return (
    <Container flex={1}>
      <Header title={i18next.t('Notification.header')} noBack={true} />
      <Container flex={1}>
        <Container
          style={[
            Gutters.tinyVPadding,
            Gutters.smallLPadding,
            Layout.rowHCenter,
            Gutters.smallBMargin,
          ]}
        >
          <Touchable
            onPress={() => {
              setIsNoti(true)
            }}
          >
            <StatusActive
              active={isNoti}
              title={i18next.t('Notification.noti')}
            />
          </Touchable>

          <Container w={MetricsSizes.small} />
          <Touchable
            onPress={() => {
              setIsNoti(false)
            }}
          >
            <StatusActive
              active={!isNoti}
              title={i18next.t('Notification.messager')}
            />
          </Touchable>
        </Container>

        <Container flex={1}>
          {isNoti ? (
            <Noti data={propsHandleGetNotifications.data?.data} />
          ) : (
            <Messager />
          )}
        </Container>
      </Container>
    </Container>
  )
}

export default Notification
