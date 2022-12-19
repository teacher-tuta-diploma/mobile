import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback } from 'react'
import Image from '@/Components/Image'
import { useTheme } from '@/Hooks'
import { useConnection } from '../Uikit'

const ChatLoginScreen = () => {
  const { Images, MetricsSizes } = useTheme()
  const { connect } = useConnection()

  const handleConnect = useCallback(async () => {
    const data = await connect('NICKNAME', { nickname: 'NICKNAME' })
    console.log(
      '🛠 LOG: 🚀 --> -----------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
    console.log(
      '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 22 ~ handleConnect ~ data',
      data,
    )
    console.log(
      '🛠 LOG: 🚀 --> -----------------------------------------------------------------------🛠 LOG: 🚀 -->',
    )
  }, [connect])
  return (
    <>
      <SafeAreaView style={style.container}>
        <View style={style.logoContainer}>
          <Image
            source={Images.icon}
            w={MetricsSizes.large}
            h={MetricsSizes.large}
          />
          <Text style={style.subtitle}>Powered by React Native</Text>
        </View>
        <View style={[style.loginForm]}>
          <TextInput
            placeholder={'User ID'}
            // onChangeText={content =>
            //   dispatch({ type: 'edit-userId', payload: { content } })
            // }
            style={style.loginInput}
          />
          <TextInput
            placeholder={'Nickname'}
            // onChangeText={content =>
            //   dispatch({ type: 'edit-nickname', payload: { content } })
            // }
            style={style.loginInput}
          />
          <TouchableOpacity
            // disabled={state.connecting}
            activeOpacity={0.85}
            style={[style.loginButton]}
            onPress={handleConnect}
          >
            <Text style={style.loginButtonLabel}>Connect</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

export default ChatLoginScreen

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  logo: {
    width: 300,
    height: 51,
    marginTop: 200,
    resizeMode: 'stretch',
  },
  subtitle: {
    color: '#999',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30,
  },
  loginForm: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingLeft: 48,
    paddingRight: 48,
    paddingBottom: 36,
  },
  loginInput: {
    height: 48,
    fontSize: 16,
    padding: 12,
    borderColor: '#777',
    borderWidth: 0.2,
    borderRadius: 5,
    marginBottom: 8,
    alignSelf: 'stretch',
  },
  loginError: {
    fontSize: 18,
    color: '#d44',
    textAlign: 'center',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  loginButton: {
    height: 48,
    padding: 12,
    backgroundColor: '#742ddd',
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  loginButtonLabel: {
    color: '#fff',
    fontSize: 18,
  },
})
