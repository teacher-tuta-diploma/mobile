import BottomSheetCustom from '@/Components/BottomSheet'
import Container from '@/Components/Container'
import Gender from '@/Containers/EditProfile/components/Gender'
import { useTheme } from '@/Hooks'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import { useHandleUpdateInfoMutation } from '@/Services/modules/users'
import { AccountT } from '@/Store/Authentication/types'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import _ from 'lodash'
import React, { useCallback, useMemo, useRef, useState } from 'react'

export type BottomSheetT = {
  status?: boolean
  onShowBottomSheet: (v: Partial<Record<keyof AccountT, string>>) => void
}

export const BottomSheetContext = React.createContext<Partial<BottomSheetT>>({})

const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const { MetricsSizes, Common } = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const loading = useLoadingGlobal()
  const [updateField, setUpdateField] = useState<keyof AccountT>()
  const [value, setValue] = useState<Partial<Record<keyof AccountT, string>>>()
  const [handleUpdateInfo] = useHandleUpdateInfoMutation({
    fixedCacheKey: 'updateInfoUser',
  })

  const onChangeField = useCallback(
    (text: string) => {
      setValue({
        [updateField!]: text,
      })
    },
    [updateField],
  )

  const onShowBottomSheet = useCallback(
    (v: Partial<Record<keyof AccountT, string>>) => {
      setValue(v)
      setUpdateField(Object.keys(v)[0] as keyof AccountT)
      bottomSheetRef?.current?.snapToIndex(0)
    },
    [],
  )

  /**
   * TODO update thông tin user, loại bỏ trường id
   */
  const onUpdateInfo = useCallback(async () => {
    try {
      loading.toogleLoading?.(true, 'updatedInfo')
      await handleUpdateInfo(_.omit(value, ['id']))
    } catch (error) {
    } finally {
      bottomSheetRef?.current?.close()
      loading.toogleLoading?.(false, 'updatedInfo')
    }
  }, [handleUpdateInfo, loading, value])

  const contextValue = useMemo<BottomSheetT>(
    () => ({
      onShowBottomSheet,
    }),
    [onShowBottomSheet],
  )
  return (
    <BottomSheetContext.Provider value={contextValue}>
      <Container flex={1}>
        {children}
        <BottomSheetCustom
          {...{
            textButton: 'Cập nhật',
            onPress: onUpdateInfo,
            ref: bottomSheetRef,
          }}
          snapPoints={['50%']}
          disappearsOnIndex={-1}
        >
          <Container mh={MetricsSizes.tiny} flex={1}>
            {updateField === 'gender' ? (
              <Gender
                onChangeGender={(v: string) => onChangeField(v)}
                defaultGender={value?.[updateField!]}
              />
            ) : (
              <BottomSheetTextInput
                onChangeText={onChangeField}
                defaultValue={value?.[updateField!]}
                style={Common.textInput}
                maxLength={updateField === 'cccd' ? 12 : 35}
              />
            )}
          </Container>
        </BottomSheetCustom>
      </Container>
    </BottomSheetContext.Provider>
  )
}

export default BottomSheetProvider
