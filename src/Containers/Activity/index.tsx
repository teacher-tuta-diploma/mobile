import React, { useCallback, useState } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import { MyOrderE } from '@/Store/Delivery/enum'
import { FlatList, Text } from 'react-native'
import Tabbar from '../QrScanContainer/components/Tabbar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ActivitiyItem from './components/ActivitiyLoginned'
import ActivitiyApp from './components/ActivitiyApp'
import { Touchable } from '@/Components/Touchable'
import SessionItem from '../Home/components/SessionItem'

const MyOrder = () => {
  const { Images, MetricsSizes, Fonts, Colors } = useTheme()
  const insets = useSafeAreaInsets()
  const [tabStatus, setTabStatus] = useState<'activity' | 'confirm'>('activity')

  const onChangeTab = useCallback((tab: typeof tabStatus) => {
    setTabStatus(tab)
  }, [])

  const renderItem = useCallback(() => {
    return <SessionItem />
  }, [])

  return (
    <Container flex={1} bg={Colors.backgroundPrimary}>
      <Container ph={MetricsSizes.tiny} pt={insets.top + MetricsSizes.tiny}>
        <Text style={[Fonts.textLargeBold, { color: Colors.white }]}>
          Hoạt động
        </Text>
      </Container>
      <Container pt={MetricsSizes.tiny} ph={MetricsSizes.tiny}>
        <Tabbar onChangeTab={onChangeTab} />
      </Container>
      <Container h={MetricsSizes.regular} />
      {tabStatus === 'activity' ? (
        <>
          <Container mh={MetricsSizes.tiny}>
            <ActivitiyItem />
          </Container>
          <Container h={MetricsSizes.regular} />
          <Container mh={MetricsSizes.tiny}>
            <ActivitiyApp />
          </Container>
        </>
      ) : (
        <FlatList
          data={[1, 2, 3]}
          renderItem={renderItem}
          removeClippedSubviews
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          // ref={scrollRef}
          onEndReachedThreshold={0.5}
          // onEndReached={onTopReached}
          scrollEventThrottle={16}
          contentContainerStyle={{
            marginHorizontal: MetricsSizes.tiny,
          }}
          // onScroll={_onScroll}
        />
      )}
    </Container>
  )
}

export default MyOrder
