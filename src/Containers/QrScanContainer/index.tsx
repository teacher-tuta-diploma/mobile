import { Alert, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/Hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import BarcodeMask from 'react-native-barcode-mask'
import { scale } from 'react-native-utils-scale'
import Container from '@/Components/Container'
import { Touchable } from '@/Components/Touchable'
import { useNavigation } from '@react-navigation/native'

export const androidCameraPermissionOptions = {
  title: 'permissionCamera',
  message: 'permissionCameraMessage',
  buttonPositive: 'ok',
  buttonNegative: 'cancel',
}

const QrScanContainer = () => {
  const { Colors, Images, Fonts, MetricsSizes, FontSize } = useTheme()
  const insets = useSafeAreaInsets()
  const [hasPermission, setHasPermission] = useState(false)
  const devices = useCameraDevices()
  const device = devices.back
  const navigation = useNavigation()

  const requestCameraPermission = async () => {
    return await Camera.requestCameraPermission()
  }

  useEffect((): ReturnType<any> => {
    let isMounted = true
    requestCameraPermission().then(permission => {
      if (isMounted) {
        if (permission === 'denied') {
          Linking.openSettings()
        }
        setHasPermission(permission === 'authorized')
      }
    })
    return () => (isMounted = false)
  }, [])

  if (device == null || !hasPermission) {
    return <View style={styles.container} />
  }
  return (
    <View style={styles.container}>
      <Container ai="center" style={[{ zIndex: 999 }]} flex={1} mt={insets.top}>
        <Text
          style={[
            Fonts.textRegularBold,
            { fontSize: FontSize.regular * 2, color: Colors.white },
          ]}
        >
          Scan your QR Code
        </Text>
      </Container>
      <Touchable
        onPress={navigation.goBack}
        ai="center"
        style={[
          {
            zIndex: 999,
            position: 'absolute',
            bottom: insets.bottom + MetricsSizes.tiny,
            right: MetricsSizes.tiny,
          },
        ]}
        flex={1}
        mt={insets.top}
      >
        <Text style={[Fonts.textSmall, { color: Colors.tabPrimary }]}>
          Quay lại
        </Text>
      </Touchable>
      <Camera
        device={device}
        style={StyleSheet.absoluteFill}
        isActive={true}
        torch={'off'}
      />
      <Text>asd</Text>
      <BarcodeMask
        lineAnimationDuration={2000}
        showAnimatedLine={true}
        width={scale(200)}
        height={scale(200)}
        outerMaskOpacity={0.4}
        backgroundColor="#eee"
        edgeColor={'#fff'}
        edgeBorderWidth={4}
        edgeHeight={25}
        edgeWidth={25}
        edgeRadius={5}
        animatedLineColor={Colors.primary}
        animatedLineOrientation="horizontal"
      />
    </View>
  )
}

export default QrScanContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    //paddingVertical: 50,
  },
})
