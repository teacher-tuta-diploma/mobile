import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../Container'
import { useTheme } from '@/Hooks'
import { Touchable } from '../Touchable'
import Option from '.'

type Props = {
  isChecked?: boolean
  onPress?: () => void
  title: string
  note: string
  price: string
  leftComponent?: React.ReactNode
}
const OptionItem = ({
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
    <Touchable onPress={onPress} mh={MetricsSizes.tiny}>
      <Container jc="space-between" flexDr="row">
        <Container flex={0.8} flexDr="row" ai="center">
          <Option status={checked ? 'CHECKED' : 'UNCHECKED'} />
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
      <Text style={[Fonts.textTiny, { color: Colors.placeHolder }]}>
        {note}
      </Text>
    </Touchable>
  )
}

export default OptionItem
