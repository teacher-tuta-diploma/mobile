import { StyleSheet, Text } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import Container from '@/Components/Container'
import Header from '@/Components/Header'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/Components/TextInput'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import { Touchable } from '@/Components/Touchable'
import { useHandleChangePasswordMutation } from '@/Services/modules/users'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { STATUS_API } from '@/Services/api'
import KeyboardScrollView from '@/Components/KeyboardScrollView'
import { alertMessage } from '@/Config/alert.helper'
import { useNavigation } from '@react-navigation/native'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'

const ChangePassword = () => {
  const { Gutters, Common, Fonts, Images, Colors, MetricsSizes } = useTheme()
  const navigation = useNavigation()
  const [handleChangePassword, propsChangePassword] =
    useHandleChangePasswordMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      rePassword: '',
    },
  })
  console.log(
    '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  console.log(
    '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 19 ~ ChangePassword ~ propsChangePassword',
    propsChangePassword,
  )
  console.log(
    '🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )

  const loading = useLoadingGlobal()
  const password = useRef({})
  password.current = watch('newPassword', '')
  const oldPassword = useRef({})
  oldPassword.current = watch('oldPassword', '')

  const onChange = useCallback(
    (data: any) => {
      console.log(
        '🛠 LOG: 🚀 --> ------------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      console.log(
        '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 31 ~ onChange ~ data',
        data,
      )
      console.log(
        '🛠 LOG: 🚀 --> ------------------------------------------------------------------🛠 LOG: 🚀 -->',
      )
      handleChangePassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      })
    },
    [handleChangePassword],
  )

  useEffect(() => {
    if (
      propsChangePassword.status === QueryStatus.fulfilled &&
      propsChangePassword.data?.error?.status === STATUS_API.NOT_FOUND
    ) {
      alertMessage('Đổi mật khẩu lỗi')
    } else if (
      propsChangePassword.status === QueryStatus.fulfilled &&
      propsChangePassword.data?.updated
    ) {
      alertMessage('Đổi mật khẩu Thành công', '', false, () => {
        navigation.goBack()
      })
    }
  }, [
    navigation,
    propsChangePassword.data?.error?.status,
    propsChangePassword.data?.updated,
    propsChangePassword.status,
  ])

  useEffect(() => {
    return () => {
      propsChangePassword.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loading.toogleLoading?.(propsChangePassword.isLoading)
  }, [loading, propsChangePassword.isLoading])

  return (
    <Container bg={Colors.white} flex={1}>
      <Header title="Đổi mật khẩu" />
      <KeyboardScrollView>
        <Container ph={MetricsSizes.tiny}>
          <Container>
            <Container h={MetricsSizes.large} />
            <Text>Mật khẩu cũ</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  secureTextEntry
                  placeholder=""
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  renderRightAccessory={() => {
                    return (
                      <Container mh={MetricsSizes.tiny}>
                        <Image
                          source={Images.mail}
                          w={MetricsSizes.tiny}
                          h={MetricsSizes.tiny}
                          resizeMode="contain"
                        />
                      </Container>
                    )
                  }}
                />
              )}
              name="oldPassword"
            />
            <Container style={[Gutters.tinyRMargin]}>
              {errors.oldPassword && errors.oldPassword.type === 'required' && (
                <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                  Vui lòng nhập mật khẩu cũ
                </Text>
              )}
            </Container>
          </Container>
          <Container>
            <Container h={MetricsSizes.tiny} />
            <Text>Mật khẩu mới</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 20,
                minLength: 6,
                validate: value =>
                  value !== oldPassword.current ||
                  'Không được trùng mật khẩu cũ',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  secureTextEntry
                  placeholder=""
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  renderRightAccessory={() => {
                    return (
                      <Container mh={MetricsSizes.tiny}>
                        <Image
                          source={Images.mail}
                          w={MetricsSizes.tiny}
                          h={MetricsSizes.tiny}
                          resizeMode="contain"
                        />
                      </Container>
                    )
                  }}
                />
              )}
              name="newPassword"
            />
            <Container style={[Gutters.tinyRMargin]}>
              {errors.newPassword && errors.newPassword.type === 'required' && (
                <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                  Vui lòng nhập mật khẩu mới
                </Text>
              )}
            </Container>
            <Container style={[Gutters.tinyRMargin]}>
              {errors.newPassword &&
                (errors.newPassword.type === 'minLength' ||
                  errors.newPassword.type === 'maxLength') && (
                  <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                    Mật khẩu phải từ 6 - 20 ký tự
                  </Text>
                )}
            </Container>
            <Container style={[Gutters.tinyRMargin]}>
              {errors.newPassword && errors.newPassword.type === 'validate' && (
                <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                  {errors.newPassword.message}
                </Text>
              )}
            </Container>
          </Container>
          <Container>
            <Container h={MetricsSizes.tiny} />
            <Text>Nhập lại mật khẩu</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: value =>
                  value === password.current ||
                  'Nhập lại mật khẩu không chính xác',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  secureTextEntry
                  placeholder=""
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  renderRightAccessory={() => {
                    return (
                      <Container mh={MetricsSizes.tiny}>
                        <Image
                          source={Images.mail}
                          w={MetricsSizes.tiny}
                          h={MetricsSizes.tiny}
                          resizeMode="contain"
                        />
                      </Container>
                    )
                  }}
                />
              )}
              name="rePassword"
            />
            <Container style={[Gutters.tinyRMargin]}>
              {errors.rePassword && errors.rePassword.type === 'required' && (
                <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                  Vui lòng nhập lại mật khẩu
                </Text>
              )}
              {errors.rePassword && errors.rePassword.type === 'validate' && (
                <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                  {errors.rePassword.message}
                </Text>
              )}
            </Container>
          </Container>
        </Container>
      </KeyboardScrollView>
      <Container style={styles.button}>
        <Touchable
          onPress={handleSubmit(onChange)}
          mh={MetricsSizes.tiny}
          style={[
            Common.button.rounded,
            { backgroundColor: Colors.primary, height: MetricsSizes.small * 2 },
            Gutters.tinyTMargin,
          ]}
        >
          <Text style={[Fonts.textRegular]}>Cập nhật</Text>
        </Touchable>
      </Container>
    </Container>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
})
