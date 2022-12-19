import { useMemo } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'

export const useStyleOtpInput = () => {
  const { Colors } = useTheme()

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        inputsContainer: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginTop: 20,
        },
        inputContainer: {
          borderColor: Colors.grey,
          borderWidth: 1,
          backgroundColor: Colors.white,
          padding: Platform.OS === 'ios' ? 5 : 0,
          width: 35,
          marginHorizontal: 5,
          borderRadius: 6,
        },
        inputContainerFocused: {
          borderColor: Colors.black,
          borderWidth: 2,
        },
        inputText: {
          fontSize: 24,
          textAlign: 'center',
          color: Colors.black,
          // fontFamily: fontsExo.fontExoBold,
          fontWeight: 'bold',
        },
        hiddenCodeInput: {
          position: 'absolute',
          width: 0,
          opacity: 0,
          height: 200,
        },
      }),
    [Colors.black, Colors.grey, Colors.white],
  )
}
