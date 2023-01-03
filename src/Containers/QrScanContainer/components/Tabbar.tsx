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
const Tabbar = () => {
  const { Layout, Colors, MetricsSizes } = useTheme()
  const [activeTab, setActiveTab] = useState<'1' | '2'>('1')
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
          setActiveTab('1')
        }}
        text="Hoạt động"
        isActive={activeTab === '1'}
      />

      <Tab
        onPress={() => {
          setActiveTab('2')
        }}
        text="Xác nhận"
        isActive={activeTab === '2'}
      />
    </Container>
  )
}

export default Tabbar

const styles = StyleSheet.create({})
