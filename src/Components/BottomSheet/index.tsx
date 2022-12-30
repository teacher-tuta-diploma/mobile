import { Text, TouchableOpacity, Keyboard } from 'react-native'
import React, { forwardRef, useCallback } from 'react'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet'
import { useTheme } from '@/Hooks'
import Container from '../Container'
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop'

import { BottomSheetFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  children: React.ReactNode
  onPress?: () => void
  textButton?: string
  snapPoints?: (string | number)[]
  appearsOnIndex?: number
  disappearsOnIndex?: number
  keyboardBehavior?: 'fillParent' | 'extend' | 'interactive'
}
const BottomSheetCustom = forwardRef<BottomSheet, Props>(
  (
    {
      children,
      onPress,
      textButton,
      snapPoints,
      appearsOnIndex,
      disappearsOnIndex,
      keyboardBehavior,
    }: Props,
    ref,
  ) => {
    const { Fonts, Colors, MetricsSizes, Common, Gutters } = useTheme()
    const inset = useSafeAreaInsets()
    const renderBackDrop = useCallback(
      (props: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={disappearsOnIndex ?? 0}
            appearsOnIndex={appearsOnIndex ?? 1}
          />
        )
      },
      [disappearsOnIndex, appearsOnIndex],
    )

    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => {
        return (
          <BottomSheetFooter
            style={{
              backgroundColor: Colors.white,
              paddingBottom: inset.bottom,
            }}
            {...props}
          >
            <TouchableOpacity
              onPress={onPress}
              style={[
                Common.button.rounded,
                {
                  backgroundColor: Colors.primary,
                  height: MetricsSizes.small * 2,
                },
                Gutters.tinyBMargin,
                Gutters.tinyHMargin,
              ]}
            >
              <Text style={[Fonts.textRegular]}>{textButton}</Text>
            </TouchableOpacity>
          </BottomSheetFooter>
        )
      },
      [
        Colors.primary,
        Colors.white,
        Common.button.rounded,
        Fonts.textRegular,
        Gutters.tinyBMargin,
        Gutters.tinyHMargin,
        MetricsSizes.small,
        inset.bottom,
        onPress,
        textButton,
      ],
    )

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints ?? ['35%', '60%']}
        enablePanDownToClose
        index={-1}
        backgroundStyle={{
          backgroundColor: Colors.backgroundSecondary,
        }}
        keyboardBehavior={keyboardBehavior ?? 'interactive'}
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackDrop}
        style={Common.bottomSheetShadow}
        footerComponent={textButton ? renderFooter : undefined}
        onClose={() => {
          Keyboard.dismiss()
        }}
      >
        <Container mh={MetricsSizes.tiny} flex={1}>
          {children}
        </Container>
      </BottomSheet>
    )
  },
)

export default BottomSheetCustom
