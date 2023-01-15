import React, { useRef, useState } from 'react'
import Container from '@/Components/Container'
import Header from '@/Components/Header'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/Components/TextInput'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import KeyboardScrollView from '@/Components/KeyboardScrollView'
import ButtonGradient from '@/Components/ButtonGradient'
import { Text } from 'react-native'

const ConfirmChangePassword = () => {
  const { Gutters, Fonts, Images, Colors, MetricsSizes } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  // const navigation = useNavigation()
  // const [handleChangePassword, propsChangePassword] =
  //   useHandleChangePasswordMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  const password = useRef({})
  password.current = watch('password', '')

  return (
    <Container bg={Colors.black} flex={1} ph={MetricsSizes.small}>
      <Header title="Mật khẩu" textLarge />
      <KeyboardScrollView>
        <Container ph={MetricsSizes.tiny}>
          <Text
            style={[
              Fonts.textSmall,
              Gutters.regularTMargin,
              { color: Colors.neutral500 },
            ]}
          >
            Đặt mật khẩu mạnh và không sử dụng lại mật khẩu cho các tài khoản
            khác
          </Text>
          <Text
            style={[
              Fonts.textSmall,
              Gutters.tinyTMargin,
              { color: Colors.neutral500 },
            ]}
          >
            Nếu thay đổi mật khẩu, bạn sẽ bị đăng xuất khỏi các thiết bị bạn sử
            dụng.
          </Text>
          <Container
            bw={1}
            ph={MetricsSizes.small}
            pv={MetricsSizes.small}
            bc={Colors.backgroundSecondary}
            br={MetricsSizes.tiny}
            mt={MetricsSizes.regular}
          >
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  secureTextEntry
                  placeholder="Mật khẩu mới"
                  placeholderTextColor={Colors.textSecondary}
                  style={[{ borderColor: Colors.borderInput2 }]}
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
              {errors.password && errors.password.type === 'minLength' && (
                <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                  Hãy sử dụng mật khẩu ít nhất 8 ký tự
                </Text>
              )}
            </Container>
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
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor={Colors.textSecondary}
                  style={[
                    Gutters.smallTMargin,
                    { borderColor: Colors.borderInput2 },
                  ]}
                  inputStyle={{ color: Colors.white }}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="confirmPassword"
            />
            <Container>
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'required' && (
                  <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                    Vui lòng xác nhận mật khẩu
                  </Text>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'validate' && (
                  <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
            </Container>
            <Text
              style={[
                Fonts.textTiny,
                Gutters.tinyTMargin,
                { color: Colors.textSecondary },
              ]}
            >
              Mật khẩu mạnh: Hãy sử dụng ít nhất 8 ký tự. Không sử dụng mật khẩu
              cho trang web khác.
            </Text>
          </Container>
        </Container>
      </KeyboardScrollView>
      <ButtonGradient text="Đổi mật khẩu" onPress={handleSubmit(() => {})} />
    </Container>
  )
}

export default ConfirmChangePassword
