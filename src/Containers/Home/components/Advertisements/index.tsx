import { ScrollView, Text, Modal } from 'react-native'
import React, { useMemo, useState } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import AdvertisementsItem from './Item'
import { useHandleGetAdvertisementsQuery } from '@/Services/modules/users'
import Image from '@/Components/Image'
import { Touchable } from '@/Components/Touchable'
import { navigate } from '@/Navigators/utils'

const Advertisements = () => {
  const { Gutters, Fonts, Colors, FontFamily, MetricsSizes, Images } =
    useTheme()
  const [showAdver, setShowAdver] = useState(true)
  const propsHandleGetAdvertisements = useHandleGetAdvertisementsQuery({})

  /**
   * quảng cáo được hiển thị trên app
   */
  const data = useMemo(
    () =>
      propsHandleGetAdvertisements?.data?.data?.filter(
        advertise => advertise.displayInApp,
      ),
    [propsHandleGetAdvertisements?.data?.data],
  )

  const dataOpenApp = useMemo(
    () =>
      propsHandleGetAdvertisements?.data?.data?.find(
        advertise => advertise.displayWhenOpenApp,
      ),
    [propsHandleGetAdvertisements?.data?.data],
  )
  return (
    <>
      {data?.length! > 0 && (
        <Container style={[Gutters.smallHMargin]}>
          <Text
            style={[
              Fonts.textSmall,
              Gutters.tinyVMargin,
              { color: Colors.note, fontFamily: FontFamily.NunitoBold },
            ]}
          >
            Giới thiệu cho bạn
          </Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {data?.map((value, index) => {
              return <AdvertisementsItem key={index} advertise={value} />
            })}
          </ScrollView>
          <Modal
            animationType="fade"
            transparent={true}
            visible={dataOpenApp && showAdver}
            onRequestClose={() => {
              setShowAdver(!showAdver)
            }}
          >
            <Container flex={1} jc="center" ai="center" bg={'rgba(0,0,0,0.2)'}>
              <Container>
                <Touchable
                  onPress={() => {
                    navigate('AdvertisementScreen', {
                      advertisements: dataOpenApp,
                    })
                  }}
                >
                  <Image
                    source={{ uri: dataOpenApp?.imageDisplay ?? '' }}
                    width={MetricsSizes.deviceWidth * 0.9}
                    resizeMode="stretch"
                    br={MetricsSizes.tiny}
                  />
                </Touchable>
                <Touchable
                  style={[
                    {
                      position: 'absolute',
                      top: -MetricsSizes.small / 2.3,
                      right: -MetricsSizes.small / 2.7,
                    },
                  ]}
                  onPress={() => {
                    setShowAdver(!showAdver)
                  }}
                >
                  <Image
                    source={Images.x_circle}
                    w={MetricsSizes.small}
                    h={MetricsSizes.small}
                    resizeMode="stretch"
                    tintColor={Colors.white}
                    br={MetricsSizes.tiny}
                  />
                </Touchable>
              </Container>
            </Container>
          </Modal>
        </Container>
      )}
    </>
  )
}

export default Advertisements
