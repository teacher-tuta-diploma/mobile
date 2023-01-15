import BottomSheetCustom from '@/Components/BottomSheet'
import Container from '@/Components/Container'
import Gender from '@/Containers/EditProfile/components/Gender'
import { useTheme } from '@/Hooks'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import _ from 'lodash'
import React, { useCallback, useMemo, useRef, useState } from 'react'

export type BottomSheetT = {
  status?: boolean
  onShowBottomSheet: (c: React.ReactNode) => void
  onCloseBottomSheet: () => void
}

export const BottomSheetContext = React.createContext<Partial<BottomSheetT>>({})

const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const { MetricsSizes, Common } = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const loading = useLoadingGlobal()
  const [child, setChild] = useState<React.ReactNode>()

  const onShowBottomSheet = useCallback((c: React.ReactNode) => {
    setChild(c)
    bottomSheetRef?.current?.snapToIndex(0)
  }, [])

  const onCloseBottomSheet = useCallback(() => {
    bottomSheetRef?.current?.close()
  }, [])

  const contextValue = useMemo<BottomSheetT>(
    () => ({
      onShowBottomSheet,
      onCloseBottomSheet,
    }),
    [onCloseBottomSheet, onShowBottomSheet],
  )
  return (
    <BottomSheetContext.Provider value={contextValue}>
      <Container flex={1}>
        {children}
        <BottomSheetCustom
          {...{
            ref: bottomSheetRef,
          }}
          snapPoints={['50%']}
          disappearsOnIndex={-1}
        >
          <Container flex={1}>{child}</Container>
        </BottomSheetCustom>
      </Container>
    </BottomSheetContext.Provider>
  )
}

export default BottomSheetProvider
