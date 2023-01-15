import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextField from '@/Components/TextInput'

const SearchBox = () => {
  const { Colors, Images, MetricsSizes } = useTheme()
  const insets = useSafeAreaInsets()
  return (
    <Container
      mt={insets.top + MetricsSizes.tiny}
      bg={Colors.backgroundSecondary}
      mh={MetricsSizes.tiny}
    >
      <TextField
        style={{
          borderWidth: 0,
        }}
        placeholder="Tìm kiếm tài khoản"
        placeholderTextColor={Colors.textPlaceholder}
      />
    </Container>
  )
}

export default SearchBox

const styles = StyleSheet.create({})
