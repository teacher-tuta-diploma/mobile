import React, { useState } from 'react'
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
import ButtonGradient from '@/Components/ButtonGradient'
import { Text } from 'react-native'
import CheckBox from '@/Components/CheckBoxItem/CheckBox'
import { navigate } from '@/Navigators/utils'

const EnterPassword = () => {
  const { Gutters, Common, Fonts, Images, Colors, MetricsSizes } = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: '',
    },
  })

  return (
    <Container bg={Colors.black} flex={1} ph={MetricsSizes.small}>
      <Header title="Nhập mật khẩu" textLarge />
      <KeyboardScrollView>
        <Container ph={MetricsSizes.tiny}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Nhập mật khẩu"
                placeholderTextColor={Colors.textSecondary}
                style={[
                  Gutters.largeTMargin,
                  {
                    borderWidth: 0,
                    backgroundColor: Colors.backgroundSecondary,
                  },
                ]}
                inputStyle={{ color: Colors.white }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="password"
          />
          <Container>
            {errors.password && errors.password.type === 'required' && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                Vui lòng nhập mật khẩu
              </Text>
            )}
          </Container>
        </Container>
      </KeyboardScrollView>
      <ButtonGradient text="Tiếp theo" onPress={handleSubmit(() => {})} />
    </Container>
  )
}

export default EnterPassword
