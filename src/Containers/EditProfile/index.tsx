import { Text } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Header from '@/Components/Header'
import Avatar from './components/Avatar'
import Container from '@/Components/Container'
import { useAsyncEffect, useTheme } from '@/Hooks'
import Field from './components/Field'
import {
  useHandleGetDocumentQuery,
  useHandleGetInfoQuery,
  useHandleUpdateInfoMutation,
} from '@/Services/modules/users'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import useDatePicker from '@/Hooks/useDatePicker'
import { formatDateTimeDob } from '@/Config/utils'
import KeyboardScrollView from '@/Components/KeyboardScrollView'
import _ from 'lodash'
import { useAppSelector } from '@/Hooks/useApp'
import { useNavigation } from '@react-navigation/native'
import useBottomSheet from '@/Hooks/useBottomSheet'

const EditProfile = () => {
  const { Fonts, Colors, MetricsSizes, Gutters, FontFamily } = useTheme()
  const { accessToken } = useAppSelector(state => state.authentication)
  const propsGetInfo = useHandleGetInfoQuery()
  const loading = useLoadingGlobal()
  const datePicker = useDatePicker()
  const bottomSheet = useBottomSheet()
  const propsGetDocument = useHandleGetDocumentQuery({
    authToken: accessToken,
  })
  const avatar = useMemo(
    () => propsGetDocument?.data?.data?.[0]?.document?.url ?? '',
    [propsGetDocument.data?.data],
  )
  const navigation = useNavigation()
  const [handleUpdateInfo] = useHandleUpdateInfoMutation()

  useAsyncEffect(async () => {
    try {
      if (navigation.isFocused() && datePicker.selectedDate !== undefined) {
        loading.toogleLoading?.(true, 'updateInfo')
        await handleUpdateInfo(
          _.omit({ dob: formatDateTimeDob(datePicker.selectedDate) }, ['id']),
        )
        datePicker?.setSelectedDate?.(undefined)
      }
    } catch (error) {
    } finally {
      loading.toogleLoading?.(false, 'updateInfo')
    }
  }, [datePicker, handleUpdateInfo, loading, navigation])

  useEffect(() => {
    datePicker?.setSelectedDate?.(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container flex={1} bg={Colors.white}>
      <Header title="Cập nhật thông tin cá nhân" />
      <KeyboardScrollView>
        <Container mv={MetricsSizes.regular} ai="center">
          <Avatar defaultUrl={avatar} />
          <Text
            style={[
              Fonts.textRegular,
              Gutters.tinyTMargin,
              { color: Colors.black, fontFamily: FontFamily.NunitoBold },
            ]}
          >
            Ảnh chân dung
          </Text>
        </Container>
        <Container ph={MetricsSizes.small}>
          <Field
            onPress={() =>
              bottomSheet.onShowBottomSheet?.({ name: propsGetInfo.data?.name })
            }
            label="Họ và tên"
            value={propsGetInfo.data?.name}
          />
          <Field
            label="Số điện thoại"
            value={propsGetInfo.data?.phone?.replace('+84', '0')}
          />
          <Field
            onPress={() => datePicker.toggle?.(true, 'date')}
            label="Ngày sinh"
            value={
              propsGetInfo.data?.dob
                ? propsGetInfo.data?.dob?.includes('/')
                  ? propsGetInfo.data?.dob
                  : formatDateTimeDob(new Date(propsGetInfo.data?.dob))
                : ''
            }
          />
          <Field
            onPress={() =>
              bottomSheet.onShowBottomSheet?.({
                address: propsGetInfo.data?.address,
              })
            }
            label="Địa chỉ"
            value={propsGetInfo.data?.address}
          />
          <Field
            onPress={() =>
              bottomSheet.onShowBottomSheet?.({
                gender: propsGetInfo.data?.gender,
              })
            }
            label="Giới tính"
            value={
              propsGetInfo.data?.gender === 'MALE'
                ? 'Nam'
                : propsGetInfo.data?.gender === 'FEMALE'
                ? 'Nữ'
                : ''
            }
          />
          <Field
            onPress={() =>
              bottomSheet.onShowBottomSheet?.({ cccd: propsGetInfo.data?.cccd })
            }
            label="Số CCCD"
            value={propsGetInfo.data?.cccd}
          />
        </Container>
      </KeyboardScrollView>
    </Container>
  )
}

export default EditProfile
