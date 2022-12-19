import { Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import Image from '@/Components/Image'
import { SenderReceiverT } from '@/Store/Delivery/type'
import { ListLoader } from '../ContentLoader'
import i18next from 'i18next'

type Props = {
  sender: SenderReceiverT
  receivers: SenderReceiverT[]
  time?: string
}

const SendAndReceiveInfo = ({ sender, receivers, time }: Props) => {
  const { Fonts, MetricsSizes, Images, Colors, Gutters, FontFamily, Common } =
    useTheme()
  return (
    <Container>
      <Text
        style={[
          Fonts.textSmall,
          { fontFamily: FontFamily.NunitoBold, color: Colors.grey3 },
        ]}
      >
        {i18next.t('SendAndReceiveInfo.name')}
      </Text>
      <Container h={MetricsSizes.tiny} />
      <Container
        style={Common.shadowContainer}
        br={MetricsSizes.tiny}
        ph={MetricsSizes.tiny}
        pv={MetricsSizes.tiny}
      >
        <Container mv={MetricsSizes.tiny}>
          <Container flexDr="row" ai="center">
            <Image
              source={Images.user}
              tintColor={Colors.grey3}
              w={MetricsSizes.tiny}
              h={MetricsSizes.tiny}
              resizeMode="contain"
            />
            <Text
              style={[
                Fonts.textSmall,
                Gutters.tinyHMargin,
                { fontFamily: FontFamily.NunitoBold, color: Colors.grey3 },
              ]}
            >
              {sender.name}
            </Text>
            <Container
              bg={Colors.bgRed}
              br={MetricsSizes.tiny}
              ph={MetricsSizes.tiny / 2}
            >
              <Text style={[Fonts.textTiny]}>
                {i18next.t('SendAndReceiveInfo.sender')}
              </Text>
            </Container>
          </Container>

          <Container ml={MetricsSizes.small}>
            <Text style={[Fonts.textTiny, { color: Colors.grey3 }]}>
              {sender.phone}
            </Text>
            <Text style={[Fonts.textTiny, { color: Colors.grey3 }]}>
              {sender.address}
            </Text>
            <Text style={[Fonts.textTiny, { color: Colors.grey3 }]}>
              {time}
            </Text>
          </Container>
        </Container>
        {receivers.length ? (
          receivers.map((receiver, index) => (
            <Container key={index}>
              <Container h={1} bg={Colors.grey} />

              <Container mv={MetricsSizes.tiny}>
                <Container flexDr="row" ai="center">
                  <Image
                    source={Images.user}
                    tintColor={Colors.grey3}
                    w={MetricsSizes.tiny}
                    h={MetricsSizes.tiny}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      Fonts.textSmall,
                      Gutters.tinyHMargin,
                      {
                        fontFamily: FontFamily.NunitoBold,
                        color: Colors.grey3,
                      },
                    ]}
                  >
                    {receiver.name}
                  </Text>
                  <Container
                    bg={Colors.blue}
                    br={MetricsSizes.tiny}
                    ph={MetricsSizes.tiny / 2}
                  >
                    <Text style={[Fonts.textTiny]}>
                      {i18next.t('SendAndReceiveInfo.receiver')}
                    </Text>
                  </Container>
                </Container>
                <Container ml={MetricsSizes.small}>
                  <Text style={[Fonts.textTiny, { color: Colors.grey3 }]}>
                    {receiver.phone}
                  </Text>
                  <Text style={[Fonts.textTiny, { color: Colors.grey3 }]}>
                    {receiver.address}
                  </Text>
                </Container>
              </Container>
            </Container>
          ))
        ) : (
          <ListLoader />
        )}
      </Container>
    </Container>
  )
}

export default SendAndReceiveInfo
