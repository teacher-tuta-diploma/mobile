import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import { Touchable } from '@/Components/Touchable'

const Tab = ({ text, isActive, onPress }) => {
  const { Fonts, Colors, MetricsSizes } = useTheme()

  return isActive ? (
    <Touchable
      ai="center"
      jc="center"
      onPress={onPress}
      br={MetricsSizes.tiny}
      bg={Colors.tabPrimary}
      flex={1}
    >
      <Text style={[Fonts.textSmallBold, { color: Colors.white }]}>{text}</Text>
    </Touchable>
  ) : (
    <Touchable onPress={onPress} ai="center" jc="center" flex={1}>
      <Text style={[Fonts.textSmallBold, { color: Colors.textSecondary }]}>
        {text}
      </Text>
    </Touchable>
  )
}
const Tabbar = ({ onChangeTab }) => {
  const { Layout, Colors, MetricsSizes } = useTheme()
  const [activeTab, setActiveTab] = useState<'activity' | 'confirm'>('activity')
  return (
    <Container
      h={MetricsSizes.large}
      w={'100%'}
      bg={Colors.backgroundSecondary}
      flexDr="row"
      bc={Colors.tabPrimary}
      br={MetricsSizes.tiny}
      bw={1}
    >
      <Tab
        onPress={() => {
          setActiveTab('activity')
          onChangeTab('activity')
        }}
        text="Hoạt động"
        isActive={activeTab === 'activity'}
      />

      <Tab
        onPress={() => {
          setActiveTab('confirm')
          onChangeTab('confirm')
        }}
        text="Xác nhận"
        isActive={activeTab === 'confirm'}
      />
    </Container>
  )
}

export default Tabbar

const styles = StyleSheet.create({})
