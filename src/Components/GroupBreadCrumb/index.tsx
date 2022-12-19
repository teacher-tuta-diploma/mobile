import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Container from '../Container'
import { useTheme } from '@/Hooks'
import Image from '../Image'
import { Touchable } from '../Touchable'

type Props = {
  funcs: {
    name: string
    icon: number
    onPress?: () => void
  }[]
}
const GroupBreadCrumb = ({ funcs }: Props) => {
  const { Gutters, Fonts, Colors, MetricsSizes } = useTheme()
  return (
    <Container
      mh={MetricsSizes.tiny}
      bg={Colors.white}
      br={MetricsSizes.small}
      style={styles.container}
      mt={MetricsSizes.small}
    >
      {funcs.map((func, index) => {
        return (
          <Touchable key={index} onPress={func.onPress}>
            <Container
              pv={MetricsSizes.tiny * 1.5}
              pl={MetricsSizes.small}
              flexDr="row"
              ai="center"
            >
              <Image
                source={func.icon}
                w={MetricsSizes.small * 0.9}
                h={MetricsSizes.small * 0.9}
                resizeMode="contain"
                tintColor={Colors.primary}
              />
              <Text
                style={[
                  Fonts.textRegular,
                  Gutters.tinyLPadding,
                  { color: Colors.black },
                ]}
              >
                {func.name}
              </Text>
            </Container>
            {index < funcs.length - 1 && (
              <Container bg={Colors.grey2} w={'100%'} h={1} />
            )}
          </Touchable>
        )
      })}
    </Container>
  )
}

export default GroupBreadCrumb

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,

    elevation: 11,
  },
})
