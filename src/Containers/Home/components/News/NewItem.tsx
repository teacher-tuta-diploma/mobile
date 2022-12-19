import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import OpenURLButton from '@/Components/OpenURLButton'
import Image from '@/Components/Image'

type Props = {
  image: string
  title: string
  link: string
}
const NewItem = ({ image, title, link }: Props) => {
  const { Fonts, Colors, MetricsSizes, FontFamily } = useTheme()

  return (
    <OpenURLButton url={link}>
      <Container mr={MetricsSizes.small} w={MetricsSizes.deviceWidth / 2}>
        <Image
          source={{ uri: image }}
          w={MetricsSizes.deviceWidth / 2}
          h={MetricsSizes.deviceWidth / 2}
          resizeMode="stretch"
        />
        <Container
          ph={MetricsSizes.tiny}
          pv={MetricsSizes.tiny}
          bg={Colors.bgNew}
          h={MetricsSizes.large}
          style={styles.info}
        >
          <Text
            numberOfLines={2}
            style={[Fonts.textSmall, { fontFamily: FontFamily.NunitoBold }]}
          >
            {title}
          </Text>
          {/* <Text numberOfLines={2} style={[Fonts.textSmall]}>
          {date.toDateString()}
        </Text> */}
        </Container>
      </Container>
    </OpenURLButton>
  )
}

export default NewItem

const styles = StyleSheet.create({
  info: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
})
