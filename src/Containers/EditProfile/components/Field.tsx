import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'

interface Props {
  label: string
  value?: string
  onPress?: () => void
}
const Field = ({ label, value, onPress }: Props) => {
  const { Gutters, Fonts, Images, Colors, MetricsSizes } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={typeof onPress === 'undefined' ? 1 : undefined}
    >
      <Container
        flexDr="row"
        jc="space-between"
        ai="center"
        pv={MetricsSizes.tiny * 1.2}
      >
        <Text style={[Fonts.textSmall, { color: Colors.grey3 }]}>{label}</Text>
        <Container flexDr="row" ai="center">
          <Text
            style={[
              Fonts.textSmall,
              Gutters.tinyRMargin,
              { color: Colors.grey3 },
            ]}
          >
            {value}
          </Text>
          {typeof onPress !== 'undefined' ? (
            <Image
              source={Images.arrow_right}
              w={MetricsSizes.tiny}
              h={MetricsSizes.tiny}
              resizeMode="contain"
            />
          ) : (
            <Container w={MetricsSizes.tiny} />
          )}
        </Container>
      </Container>
      <Container h={1} w={'100%'} bg={Colors.grey5} />
    </TouchableOpacity>
  )
}

export default Field
