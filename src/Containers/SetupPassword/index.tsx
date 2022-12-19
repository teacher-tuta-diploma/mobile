import { Text } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import Container from '@/Components/Container'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/Components/TextInput'
import { useTheme } from '@/Hooks'
import { Touchable } from '@/Components/Touchable'
import i18next from 'i18next'
import { navigateAndReset } from '@/Navigators/utils'
import {
  useHandleSetNewPasswordMutation,
  useHandleVerifyOtpMutation,
} from '@/Services/modules/users'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import { alertMessage } from '@/Config/alert.helper'

const SetupPassword = () => {
  const { Colors, MetricsSizes, Common, Fonts, FontFamily } = useTheme()
  const loading = useLoadingGlobal()

  const [, propsVerifyOtp] = useHandleVerifyOtpMutation({
    fixedCacheKey: 'VerifyOtp',
  })

  const [handleSetNewPassword, propsNewPassword] =
    useHandleSetNewPasswordMutation({
      fixedCacheKey: 'setPassword',
    })

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      rePassword: '',
    },
  })

  const password = useRef({})
  password.current = watch('password', '')

  const onSetPassword = useCallback(
    (data: any) => {
      if (propsVerifyOtp.data) {
        handleSetNewPassword({
          password: data.password!,
          recoveryId: propsVerifyOtp.data?.id!,
        })
        //
      }
    },
    [handleSetNewPassword, propsVerifyOtp.data],
  )

  useEffect(() => {
    loading.toogleLoading?.(propsNewPassword.isLoading)
  }, [loading, propsNewPassword.isLoading])

  useEffect(() => {
    if (propsNewPassword.isSuccess) {
      alertMessage('Thông báo', 'Cài đặt mật khẩu thành công!', false, () => {
        navigateAndReset([{ name: 'LoginScreen' }])
      })
    }
  }, [propsNewPassword.isSuccess])

  useEffect(() => {
    return () => {
      propsNewPassword.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container ph={MetricsSizes.small} flex={1} bg={Colors.white}>
      <Container
        mt={MetricsSizes.large}
        mh={MetricsSizes.small}
        mb={MetricsSizes.large}
        ai="center"
      >
        <Text
          style={[
            Fonts.textLarge,
            { color: Colors.primary, fontFamily: FontFamily.NunitoBold },
          ]}
        >
          THIẾT LẬP MẬT KHẨU
        </Text>
        <Container mt={MetricsSizes.tiny}>
          <Text style={[Fonts.textCenter]}>Vui lòng nhập mật khẩu mới.</Text>
        </Container>
      </Container>

      <Container mv={MetricsSizes.large}>
        <Container mb={MetricsSizes.tiny}>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 20,
              minLength: 6,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Container mt={MetricsSizes.tiny}>
                <TextField
                  placeholderTextColor={Colors.placeHolder}
                  placeholder="Mật khẩu"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry
                  value={value}
                />
              </Container>
            )}
            name="password"
          />
          {errors.password && errors.password.type === 'required' && (
            <Text style={[Fonts.textTiny, { color: Colors.error }]}>
              {i18next.t('Login.message.passwordRequire')}
            </Text>
          )}
          {errors.password &&
            (errors.password.type === 'minLength' ||
              errors.password.type === 'maxLength') && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Login.message.lengthPassword')}
              </Text>
            )}
        </Container>

        <Controller
          control={control}
          rules={{
            required: true,
            validate: value =>
              value === password.current || 'Nhập lại mật khẩu không chính xác',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Container mt={MetricsSizes.tiny}>
              <TextField
                placeholderTextColor={Colors.placeHolder}
                placeholder="Nhập lại mật khẩu"
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry
                value={value}
              />
            </Container>
          )}
          name="rePassword"
        />
        {errors.rePassword && errors?.rePassword.type === 'required' && (
          <Text style={[Fonts.textTiny, { color: Colors.error }]}>
            {i18next.t('Login.message.passwordRequire')}
          </Text>
        )}

        {errors.rePassword && errors.rePassword.type === 'validate' && (
          <Text style={[Fonts.textTiny, { color: Colors.error }]}>
            {errors.rePassword.message}
          </Text>
        )}
      </Container>

      <Touchable
        onPress={handleSubmit(onSetPassword)}
        style={[Common.button.rounded, { backgroundColor: Colors.primary }]}
      >
        <Text style={[Fonts.textRegular]}>
          {i18next.t('AdviseAndSurvey.done')}
        </Text>
      </Touchable>
    </Container>
  )
}

export default SetupPassword
