import { Text } from 'react-native'
import React, { useRef } from 'react'
import Container from '@/Components/Container'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'
import { Touchable } from '@/Components/Touchable'
import Tooltip from 'rn-tooltip'

type Props = {
  focusSearch: () => void
  valueTextSearch?: string
}
const CenterMarker = ({ focusSearch, valueTextSearch }: Props) => {
  const { Images, MetricsSizes, Colors } = useTheme()
  const refToolTip = useRef<Tooltip>()
  return (
    <Container ai="center">
      <Tooltip
        ref={refToolTip as any}
        backgroundColor={Colors.white}
        height={200}
        overlayColor={'rgba(0,0,0,0.5)'}
        actionType="press"
        popover={
          <Touchable
            onPress={() => {
              refToolTip.current?.toggleTooltip()
              setTimeout(() => {
                focusSearch()
              }, 500)
            }}
          >
            <Text>{valueTextSearch}</Text>
          </Touchable>
        }
      >
        <Image
          source={Images.location}
          w={MetricsSizes.regular}
          h={MetricsSizes.regular}
          resizeMode="contain"
        />
      </Tooltip>
    </Container>
  )
}

export default CenterMarker
