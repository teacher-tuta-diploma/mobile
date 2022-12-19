import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../Container'
import CheckBox from './CheckBox'
import { useTheme } from '@/Hooks'
import { Touchable } from '../Touchable'

type Props = {
  isChecked?: boolean
  onPress?: (isChecked: boolean) => void
  title: string
  note: string
  price: string
  leftComponent?: React.ReactNode
}
const CheckBoxItem = ({
  isChecked,
  onPress,
  title,
  note,
  leftComponent,
}: Props) => {
  const { Gutters, Fonts, Colors, MetricsSizes } = useTheme()
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(!!isChecked)
  }, [isChecked])

  return (
    <Touchable
      onPress={() => {
        setChecked(v => {
          onPress?.(!v)
          return !v
        })
      }}
      mh={MetricsSizes.tiny}
      mb={MetricsSizes.tiny}
    >
      <Container jc="space-between" flexDr="row">
        <Container flex={0.8} flexDr="row">
          <CheckBox status={checked ? 'CHECKED' : 'UNCHECKED'} />
          <Text
            style={[
              Fonts.textSmall,
              Gutters.tinyLMargin,
              { color: Colors.black },
            ]}
          >
            {title}
          </Text>
        </Container>
        {leftComponent}
      </Container>
      {note && (
        <Text
          style={[
            Fonts.textTiny,
            Gutters.smallLMargin,
            Gutters.tinyLPadding,
            { color: Colors.placeHolder },
          ]}
        >
          {note}
        </Text>
      )}
    </Touchable>
  )
}

export default CheckBoxItem
