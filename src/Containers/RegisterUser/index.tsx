import { ScrollView, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import TextField from '@/Components/TextInput'
import Image from '@/Components/Image'
import CheckBox from '@/Components/CheckBoxItem/CheckBox'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import { FontFamily } from '@/Theme/Variables'
import { Controller, useForm } from 'react-hook-form'
import { useHandleRegisterUserMutation } from '@/Services/modules/users'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import { alertMessage } from '@/Config/alert.helper'
import { RootStackParamList } from '@/Navigators/utils'
// import provinces from '@/Services/province.json'
import Social from '../Login/components/Social'
import i18next from 'i18next'
import OpenURLButton from '@/Components/OpenURLButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { STATUS_API } from '@/Services/api'

const RegisterUserContainer = () => {
  const HEIGHT_DROPBOX = 300

  const { Gutters, Common, Fonts, Images, Layout, Colors, MetricsSizes } =
    useTheme()
  const inset = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [visible, setVisible] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [handleRegisterUser, { data, isSuccess, error }] =
    useHandleRegisterUserMutation({
      fixedCacheKey: 'RegisterUser',
    })
  const loading = useLoadingGlobal()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      phone: '',
      name: '',
      email: '',
      address: '',
      password: '',
    },
  })
  const watchAllFields = watch() // when pass nothing as argument, you are watching everything

  const checkRegister = useMemo(
    () =>
      !!watchAllFields.phone &&
      !!watchAllFields.password &&
      !!watchAllFields.email &&
      !!watchAllFields.name &&
      !!watchAllFields.address,
    [
      watchAllFields.address,
      watchAllFields.password,
      watchAllFields.email,
      watchAllFields.name,
      watchAllFields.phone,
    ],
  )

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)

  const onRegister = useCallback(
    (data: any) => {
      if (agreedTerms) {
        loading.toogleLoading?.(true)
        handleRegisterUser({
          address: data.address,
          email: data.email,
          name: data.name,
          phone: '+84' + data.phone,
          password: data.password,
          callback() {
            loading.toogleLoading?.(false)
          },
        })
      } else {
        alertMessage(i18next.t('Register.alert.terms'))
      }
    },
    [handleRegisterUser, loading, agreedTerms],
  )

  const onBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  useEffect(() => {
    if (isSuccess && data?.account) {
      navigation.navigate('OtpScreen', {
        phone: data?.account.phone,
        id: data?.account.id,
        credentialId: data?.credentail.id,
      })
    }
  }, [data?.account, data?.credentail.id, isSuccess, navigation])

  /**
   * nếu tài khoản đã đăng ký nhưng chưa activate thì chuyển sang OTP
   */
  useEffect(() => {
    if (error?.status === STATUS_API.CONFLICT) {
      navigation.navigate('OtpScreen', {
        phone: error?.data?.error.data.account.phone,
        id: error?.data?.error.data.account.id,
        credentialId: error?.data?.error.data?.credentail.id,
      })
    }
  }, [
    error?.data?.error.data?.account.id,
    error?.data?.error.data?.account.phone,
    error?.data?.error.data?.credentail.id,
    error?.status,
    navigation,
  ])

  return (
    <Container flex={1}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Container
        pt={inset.top + MetricsSizes.tiny}
        ph={MetricsSizes.tiny}
        flex={1}
        bg={Colors.white}
      >
        <KeyboardAwareScrollView>
          <Container ai="center">
            <Text
              style={[
                Fonts.textLarge,
                { color: Colors.primary, fontFamily: FontFamily.NunitoBold },
              ]}
            >
              {i18next.t('app.title')}
            </Text>
            <Text style={[Fonts.textRegular, { color: Colors.primary }]}>
              {i18next.t('Register.intro')}
            </Text>
            <Image
              source={Images.icon_truck2}
              w={MetricsSizes.small}
              h={MetricsSizes.small}
              resizeMode="contain"
            />
          </Container>
          <Container h={MetricsSizes.regular} />
          <Container>
            <Text
              style={[
                Fonts.textSmall,
                Gutters.tinyLMargin,
                { color: Colors.grey3 },
              ]}
            >
              {i18next.t('Register.request')}
            </Text>
          </Container>

          <Container h={MetricsSizes.regular} />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /([3|5|7|8|9])+([0-9]{8})\b/g,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={9}
                keyboardType="numeric"
                placeholder={i18next.t('Register.placeholder.numberPhone')}
                renderLeftAccessory={() => {
                  return (
                    <Container mh={MetricsSizes.tiny} flexDr="row">
                      <Text
                        style={[Fonts.textSmall, { color: Colors.borderInput }]}
                      >
                        +84
                      </Text>
                    </Container>
                  )
                }}
                renderRightAccessory={() => {
                  return (
                    <Container mh={MetricsSizes.tiny}>
                      <Image
                        source={Images.phone}
                        w={MetricsSizes.tiny}
                        h={MetricsSizes.tiny}
                        resizeMode="contain"
                      />
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
          <Container h={MetricsSizes.tiny} />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={i18next.t('Register.placeholder.name')}
                renderRightAccessory={() => {
                  return (
                    <Container mh={MetricsSizes.tiny}>
                      <Image
                        source={Images.user}
                        w={MetricsSizes.tiny}
                        h={MetricsSizes.tiny}
                        resizeMode="contain"
                      />
                    </Container>
                  )
                }}
              />
            )}
            name="name"
          />
          <Container style={[Gutters.tinyRMargin]}>
            {errors.name && errors.name.type === 'required' && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Register.message.nameRequire')}
              </Text>
            )}
          </Container>
          <Container h={MetricsSizes.tiny} />
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 6,
              maxLength: 20,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                secureTextEntry
                placeholder={i18next.t('Register.placeholder.password')}
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
            name="password"
          />
          <Container style={[Gutters.tinyRMargin]}>
            {errors.password && errors.password.type === 'required' && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Register.message.passwordRequire')}
              </Text>
            )}
          </Container>
          {errors.password &&
            (errors.password.type === 'minLength' ||
              errors.password.type === 'maxLength') && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Login.message.lengthPassword')}
              </Text>
            )}
          <Container h={MetricsSizes.tiny} />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder={i18next.t('Register.placeholder.email')}
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
            name="email"
          />
          <Container style={[Gutters.tinyRMargin]}>
            {errors.email && errors.email.type === 'required' && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Register.message.emailRequire')}
              </Text>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Register.message.emailInvalid')}
              </Text>
            )}
          </Container>
          <Container h={MetricsSizes.tiny} />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder={i18next.t('Register.placeholder.address')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                renderRightAccessory={() => {
                  return (
                    <TouchableOpacity onPress={showMenu}>
                      <Container
                        flexDr="row"
                        ai="center"
                        mh={MetricsSizes.tiny}
                      >
                        <Container
                          mh={MetricsSizes.tiny}
                          bg={Colors.grey}
                          w={1}
                          h={30}
                        />

                        <Menu
                          visible={visible}
                          style={{ height: HEIGHT_DROPBOX }}
                          anchor={
                            <Image
                              source={Images.dropdown}
                              w={MetricsSizes.tiny}
                              h={MetricsSizes.tiny}
                              resizeMode="contain"
                            />
                          }
                          onRequestClose={hideMenu}
                        >
                          <ScrollView style={{ height: HEIGHT_DROPBOX }}>
                            <MenuItem
                              onPress={() => {
                                onChange('Hà Nội')
                                hideMenu()
                              }}
                            >
                              Hà Nội
                            </MenuItem>
                            <MenuItem
                              onPress={() => {
                                onChange('TP. Hồ Chí Minh')
                                hideMenu()
                              }}
                            >
                              TP. Hồ Chí Minh
                            </MenuItem>

                            <MenuDivider />
                            {/* {provinces.map((p, i) => {
                              return (
                                <MenuItem
                                  key={i}
                                  onPress={() => {
                                    onChange(p.province)
                                    hideMenu()
                                  }}
                                >
                                  {p.province}
                                </MenuItem>
                              )
                            })} */}
                          </ScrollView>
                        </Menu>
                      </Container>
                    </TouchableOpacity>
                  )
                }}
              />
            )}
            name="address"
          />
          <Container style={[Gutters.tinyRMargin]}>
            {errors.address && errors.address.type === 'required' && (
              <Text style={[Fonts.textTiny, { color: Colors.error }]}>
                {i18next.t('Register.message.addressRequire')}
              </Text>
            )}
          </Container>
          <Container h={MetricsSizes.tiny} />
          <Container flexDr="row">
            <TouchableOpacity
              onPress={() => {
                setAgreedTerms(!agreedTerms)
              }}
            >
              <CheckBox status={agreedTerms ? 'CHECKED' : 'UNCHECKED'} />
            </TouchableOpacity>
            <Container
              flex={1}
              style={[Gutters.tinyLMargin, { flexWrap: 'wrap' }]}
              flexDr="row"
              ai="center"
            >
              <Text style={[Fonts.textSmall, { color: Colors.grey }]}>
                {i18next.t('Register.termsAndService.text1')}
              </Text>
              <OpenURLButton url="https://thanhhung-web.tek4.vn/terms-conditions">
                <Text style={{ color: Colors.primary }}>
                  {i18next.t('Register.termsAndService.text2')}
                </Text>
              </OpenURLButton>
              <Text style={[Fonts.textSmall, { color: Colors.grey }]}>
                {i18next.t('Register.termsAndService.text3')}
              </Text>
              <OpenURLButton url="https://thanhhung-web.tek4.vn/privacy-policy">
                <Text style={{ color: Colors.primary }}>
                  {i18next.t('Register.termsAndService.text4')}
                </Text>
              </OpenURLButton>
              <OpenURLButton url="https://thanhhung-web.tek4.vn/privacy-policy">
                <Text style={{ color: Colors.primary }}>
                  {i18next.t('Register.termsAndService.text5')}
                </Text>
              </OpenURLButton>
              <Text style={[Fonts.textSmall, { color: Colors.grey }]}>
                {i18next.t('Register.termsAndService.text6')}
              </Text>
            </Container>
          </Container>

          <Container h={MetricsSizes.regular} />
          <TouchableOpacity
            onPress={handleSubmit(onRegister)}
            style={[
              Common.button.rounded,
              {
                backgroundColor: checkRegister
                  ? Colors.primary
                  : Colors.disableButton,
              },
              Gutters.tinyTMargin,
            ]}
          >
            <Text
              style={[
                Fonts.textMedium,
                { color: checkRegister ? Colors.white : Colors.black },
              ]}
            >
              {i18next.t('Register.name')}
            </Text>
          </TouchableOpacity>

          <Text style={[Fonts.textSmall, { color: Colors.placeHolder }]}>
            {i18next.t('Register.SMSConfirm')}
          </Text>

          <Container style={[Layout.alignItemsCenter, Gutters.regularTMargin]}>
            <Text style={[Fonts.textRegular, { color: Colors.grey }]}>
              {i18next.t('Register.other')}
            </Text>
          </Container>

          <Social />

          <Container h={MetricsSizes.regular} />
          <Container ai="center">
            <TouchableOpacity onPress={onBack}>
              <Text style={[Fonts.textRegular, { color: Colors.note }]}>
                {i18next.t('Register.hadAccount')}
              </Text>
            </TouchableOpacity>
          </Container>
        </KeyboardAwareScrollView>
      </Container>
    </Container>
  )
}

export default RegisterUserContainer

// const styles = StyleSheet.create({})
