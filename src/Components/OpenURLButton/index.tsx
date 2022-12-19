import { Text, Linking } from 'react-native'
import { Touchable } from '../Touchable'
import { useTheme } from '@/Hooks'
import Container from '../Container'
import React, { ReactNode, useCallback } from 'react'

const OpenURLButton = ({
  url,
  text,
  children,
}: {
  url: string
  text?: string
  children?: ReactNode
}) => {
  const { Fonts, Colors, Gutters, MetricsSizes } = useTheme()
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url)
    }
  }, [url])

  return (
    <Touchable onPress={handlePress}>
      {children || (
        <Container
          style={[Gutters.tinyPadding]}
          bg={Colors.primary}
          br={MetricsSizes.tiny}
        >
          <Text style={[Fonts.textSmall, { color: Colors.white }]}>{text}</Text>
        </Container>
      )}
    </Touchable>
  )
}

export default OpenURLButton
