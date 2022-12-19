import { StyleSheet, Text, StatusBar } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import Container from '../Container'
import Image from '../Image'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Touchable } from '../Touchable'
import { RootStackParamList } from '@/Navigators/utils'
import { useHandleGetProductQuery } from '@/Services/modules/users'
import { ProductT } from '@/Store/Delivery/type'
import { ProductLoader } from '../ContentLoader'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type Props = {
  product?: ProductT
  onPressTab?: (product: ProductT) => void
  onBack?: () => void
}
const LargeHeader = ({ product, onPressTab, onBack }: Props) => {
  const { Fonts, Images, Colors, MetricsSizes, Gutters, FontFamily, FontSize } =
    useTheme()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'EnterLocation'>>()
  const propsGetProduct = useHandleGetProductQuery(
    {
      search: 'parentId:=:0',
    },
    {},
  )
  const products = useMemo(
    () => propsGetProduct.data?.data,
    [propsGetProduct.data],
  )

  const onPressTab1 = useCallback(
    (p: ProductT) => {
      onPressTab?.(p)
      if (p.type.includes('tx')) {
        if (product) {
          navigation.replace('EnterLocation', {
            product: p,
          })
        } else {
          navigation.navigate('EnterLocation', {
            product: p,
          })
        }
      } else {
        if (product) {
          navigation.replace('DeliveryHomeOffice', {
            product: p,
          })
        } else {
          navigation.navigate('DeliveryHomeOffice', {
            product: p,
          })
        }
      }
    },
    [navigation, onPressTab, product],
  )

  const renderTab1 = useCallback(
    (p: ProductT) => {
      if (product?.id === p.id) {
        return (
          <Container
            bg={Colors.white}
            w={MetricsSizes.regular * 2}
            h={MetricsSizes.regular * 2}
            ai="center"
            jc="center"
            br={MetricsSizes.regular}
            bc={Colors.borderGreen2}
            bw={1}
            style={styles.action}
          >
            <Image
              source={
                p.type.includes('tx') ? Images.icon_truck3 : Images.moveout
              }
              w={MetricsSizes.regular * 1.3}
              h={MetricsSizes.regular * 1.3}
              resizeMode="contain"
            />
          </Container>
        )
      } else {
        return (
          <Container
            bg={Colors.white}
            w={MetricsSizes.regular * 2}
            h={MetricsSizes.regular * 2}
            ai="center"
            jc="center"
            br={MetricsSizes.regular}
            style={styles.action}
          >
            <Image
              source={
                p.type.includes('tx') ? Images.icon_truck3 : Images.moveout
              }
              w={MetricsSizes.regular * 1.3}
              h={MetricsSizes.regular * 1.3}
              resizeMode="contain"
            />
          </Container>
        )
      }
    },
    [
      Colors.borderGreen2,
      Colors.white,
      Images.icon_truck3,
      Images.moveout,
      MetricsSizes.regular,
      product,
    ],
  )

  return (
    <Container ph={MetricsSizes.tiny} bg={Colors.primary}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.primary} />
      <SafeAreaView edges={['right', 'top', 'left']}>
        <Container ai="center" flexDr="row" jc="space-between">
          {onBack ? (
            <Touchable onPress={onBack}>
              <Image
                source={Images.back}
                w={MetricsSizes.small}
                h={MetricsSizes.small}
                tintColor={Colors.white}
                resizeMode="contain"
              />
            </Touchable>
          ) : (
            <Container w={MetricsSizes.small} h={MetricsSizes.small} />
          )}
          <Text
            style={[
              Fonts.textLarge,
              {
                fontFamily: FontFamily.NunitoBold,
                fontSize: FontSize.large * 1.3,
              },
            ]}
          >
            THÀNH HƯNG
          </Text>
          <Container w={MetricsSizes.small} h={MetricsSizes.small} />
        </Container>
        <Container
          pt={MetricsSizes.regular}
          ml={products ? MetricsSizes.large * 0.8 : 0}
          jc="center"
          flexDr="row"
        >
          {products
            ? products.map((p, i) => {
                return (
                  <Touchable
                    key={i}
                    onPress={() => onPressTab1(p)}
                    w={
                      p.type.includes('tx')
                        ? MetricsSizes.large * 1.4
                        : MetricsSizes.large * 3
                    }
                    ai="center"
                  >
                    {renderTab1(p)}
                    <Text
                      style={[
                        Fonts.textTiny,
                        Gutters.tinyTMargin,
                        Fonts.textCenter,
                        { fontFamily: FontFamily.NunitoBold },
                      ]}
                    >
                      {p?.name}
                    </Text>
                  </Touchable>
                )
              })
            : [1, 2].map(_ => {
                return (
                  <Container key={_.toString()}>
                    <ProductLoader />
                  </Container>
                )
              })}
        </Container>
      </SafeAreaView>
    </Container>
  )
}

export default LargeHeader

const styles = StyleSheet.create({
  action: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
})
