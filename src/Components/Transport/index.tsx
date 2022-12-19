import { Text } from 'react-native'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTheme } from '@/Hooks'
import Container from '@/Components/Container'
import { Touchable } from '@/Components/Touchable'
import TransportInfo from './TransportInfo'
import {
  useHandleChoiceCarForOrderMutation,
  useHandleCreateOrderMutation,
} from '@/Services/modules/users'
import { SelectedCarT } from '@/Store/Delivery/type'
import { useAppDispatch } from '@/Hooks/useApp'
import { setSelectedCar } from '@/Store/Delivery'
import { useNavigation } from '@react-navigation/native'
import useLoadingGlobal from '@/Hooks/useLoadingGlobal'

type Props = SelectedCarT & { noback?: boolean; bg?: string }
const Transport = ({ noback, bg, ...props }: Props) => {
  const { Colors, Fonts, MetricsSizes } = useTheme()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const loading = useLoadingGlobal()

  const [handlePutVehicle, propsPutVehicle] =
    useHandleChoiceCarForOrderMutation({
      fixedCacheKey: 'putVehicleCategory',
    })
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )
  console.log(
    '🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 25 ~ Transport ~ propsPutVehicle',
    propsPutVehicle,
  )
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------🛠 LOG: 🚀 -->',
  )

  const [, propsCreateOrder] = useHandleCreateOrderMutation({
    fixedCacheKey: 'createOrders',
  })
  const order = useMemo(
    () => propsCreateOrder.data?.data,
    [propsCreateOrder.data?.data],
  )

  const onSelectCar = useCallback(() => {
    handlePutVehicle({
      orderVehicleCategories: [
        {
          id: props?.id!,
        },
      ],
      orderCode: order?.code ?? '',
      callback() {
        dispatch(
          setSelectedCar({
            selectedCar: props,
          }),
        )
        if (!noback) {
          navigation.goBack()
        }
      },
    })
  }, [dispatch, handlePutVehicle, navigation, noback, order?.code, props])

  useEffect(() => {
    loading.toogleLoading?.(propsPutVehicle.isLoading)
  }, [loading, propsPutVehicle.isLoading])

  useEffect(() => {
    return () => {
      propsPutVehicle.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container mt={MetricsSizes.tiny} bw={1} bc={Colors.grey} br={3} bg={bg!}>
      <TransportInfo {...props} />
      <Touchable
        onPress={onSelectCar}
        bg={Colors.white}
        bw={1}
        br={MetricsSizes.tiny}
        bc={Colors.primary}
        ml={MetricsSizes.large}
        mb={MetricsSizes.tiny}
        pv={MetricsSizes.tiny}
        w={MetricsSizes.small * 5}
        ai={'center'}
        jc={'center'}
      >
        <Text
          style={[Fonts.textTiny, { color: Colors.primary, fontWeight: '500' }]}
        >
          Chọn xe
        </Text>
      </Touchable>
    </Container>
  )
}

export default Transport
