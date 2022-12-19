import { useTheme } from '@/Hooks'
import React from 'react'
import { View } from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import Container from '../Container'

export function ProductLoader() {
  const { Colors, MetricsSizes } = useTheme()

  return (
    <SkeletonPlaceholder highlightColor={Colors.primary} speed={3500}>
      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
        <SkeletonPlaceholder.Item
          width={MetricsSizes.regular * 1.3}
          height={MetricsSizes.regular * 1.3}
          borderRadius={MetricsSizes.large / 2}
        />
        <SkeletonPlaceholder.Item
          top={2}
          width={MetricsSizes.large}
          height={MetricsSizes.tiny}
          borderRadius={MetricsSizes.tiny}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export function ListLoader() {
  const { Colors, MetricsSizes } = useTheme()

  return (
    <Container mt={MetricsSizes.tiny} style={{ height: 100 }}>
      <SkeletonPlaceholder highlightColor={Colors.primary} speed={2500}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 20 }}>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
            />
            <View
              style={{ marginTop: 6, width: 180, height: 20, borderRadius: 4 }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </Container>
  )
}
