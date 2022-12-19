import { Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import { Touchable } from '@/Components/Touchable'
import Image from '@/Components/Image'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/Components/TextInput'
import i18next from 'i18next'
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu'
import { useHandleForgotPasswordMutation } from '@/Services/modules/users'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import { navigate } from '@/Navigators/utils'

const ForgotPassword = () => {
  const { Gutters, Common, Fonts, Images, Colors, FontFamily, MetricsSizes } =
    useTheme()
  const [visible, setVisible] = useState(false)
  const [handleForgotPassword, propsFotgotPassword] =
    useHandleForgotPasswordMutation({
      fixedCacheKey: 'forgotPassword',
    })
  const loading = useLoadingGlobal()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
    },
  })

  const hideMenu = () => setVisible(false)

  const onLogin = useCallback(
    (data: typeof control._defaultValues) => {
      data.phone &&
        handleForgotPassword({
          phone:
            data.phone[0] === '0'
              ? `+84${data.phone.slice(1, data.phone.length)}`
              : `+84${data.phone}`,
        })
    },
    [control, handleForgotPassword],
  )

  useEffect(() => {
    loading.toogleLoading?.(propsFotgotPassword.isLoading)
  }, [loading, propsFotgotPassword.isLoading])

  useEffect(() => {
    if (propsFotgotPassword.isSuccess) {
      navigate('OtpScreenForgotPassword', {})
    }
  }, [propsFotgotPassword.isSuccess])

  useEffect(() => {
    return () => {
      propsFotgotPassword.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container flex={1} bg={Colors.white}>
      <Container mh={MetricsSizes.small} mb={MetricsSizes.large} ai="center">
        <Text
          style={[
            Fonts.textLarge,
            Gutters.largeTMargin,
            Gutters.largeBMargin,
            { color: Colors.primary, fontFamily: FontFamily.NunitoBold },
          ]}
        >
          QUÊN MẬT KHẨU
        </Text>
        <Text style={[Fonts.textCenter]}>
          Vui lòng nhập số điện thoại của bạn để chúng tôi có thể hỗ trợ. Hãy
          kiểm tra SMS từ Thành Hưng nhé.
        </Text>
      </Container>

      <Container mh={MetricsSizes.small}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /([3|5|7|8|9])+([0-9]{8})\b/g,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              placeholderTextColor={Colors.placeHolder}
              placeholder="Số điện thoại"
              maxLength={9}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              renderLeftAccessory={() => {
                return (
                  <Container
                    ph={MetricsSizes.tiny}
                    pv={MetricsSizes.tiny / 2}
                    br={MetricsSizes.tiny / 2}
                    bg={Colors.grey2}
                    flexDr="row"
                  >
                    <Image
                      w={MetricsSizes.small}
                      h={MetricsSizes.small}
                      source={Images.flag_vn}
                      resizeMode={'contain'}
                    />
                    <Menu
                      visible={visible}
                      anchor={
                        <Text
                          style={[Fonts.textSmall, { color: Colors.black }]}
                        >
                          +84
                        </Text>
                      }
                      onRequestClose={hideMenu}
                    >
                      <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
                      <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
                      <MenuItem disabled>Disabled item</MenuItem>
                      <MenuDivider />
                      <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
                    </Menu>
                  </Container>
                )
              }}
            />
          )}
          name="phone"
        />
        <Container style={[Gutters.tinyRMargin]}>
          {errors.phone && errors.phone.type === 'required' && (
            <Text style={[Fonts.textTiny, { color: Colors.error }]}>
              {i18next.t('Register.message.numberPhoneRequire')}
            </Text>
          )}
          {errors.phone && errors.phone.type === 'pattern' && (
            <Text style={[Fonts.textTiny, { color: Colors.error }]}>
              {i18next.t('Register.message.numberPhoneInvalid')}
            </Text>
          )}
        </Container>
        <Container mt={MetricsSizes.large}>
          <Touchable
            onPress={handleSubmit(onLogin)}
            style={[
              Common.button.rounded,
              { backgroundColor: Colors.primary },
              Gutters.tinyTMargin,
            ]}
          >
            <Text style={[Fonts.textRegular]}>Gửi</Text>
          </Touchable>
        </Container>
      </Container>
    </Container>
  )
}

export default ForgotPassword
