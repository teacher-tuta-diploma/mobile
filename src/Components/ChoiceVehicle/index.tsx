import { StyleSheet, Text } from 'react-native'
import React, { Fragment } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Func from './Func'

type Props = {
  funcs: {
    title: string
    icon: number
    onPress: () => void
  }[]
}
const ChoiceVehicle = ({ funcs }: Props) => {
  const { Fonts, Colors, MetricsSizes, FontFamily } = useTheme()

  return (
    <Container>
      <Container
        mt={MetricsSizes.small}
        mb={MetricsSizes.tiny}
        mh={MetricsSizes.tiny}
      >
        <Text
          style={[
            Fonts.textSmall,
            { color: Colors.black, fontFamily: FontFamily.NunitoBold },
          ]}
        >
          Lựa chọn phương tiện
        </Text>
      </Container>
      <Container style={styles.container}>
        <Container
          mh={MetricsSizes.tiny}
          style={styles.container}
          bg={Colors.white}
          br={MetricsSizes.tiny}
          overflow="hidden"
        >
          {funcs.map((e, i) => {
            return (
              <Fragment key={i}>
                <Func onPress={e.onPress} title={e.title} image={e.icon} />
                {i < funcs.length - 1 && (
                  <Container w={'100%'} h={1} bg={Colors.grey4} />
                )}
              </Fragment>
            )
          })}
        </Container>
      </Container>
    </Container>
  )
}

export default ChoiceVehicle

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3,

    elevation: 11,
  },
})
