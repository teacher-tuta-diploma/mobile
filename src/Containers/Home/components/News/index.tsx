import { ScrollView, Text } from 'react-native'
import React from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import NewItem from './NewItem'
import { useHandleGetNewsQuery } from '@/Services/modules/users'

const PromotionNews = () => {
  const { Gutters, Fonts, Colors, FontFamily } = useTheme()
  const { data } = useHandleGetNewsQuery({})
  return (
    <Container style={[Gutters.smallLMargin]}>
      <Text
        style={[
          Fonts.textSmall,
          Gutters.tinyVMargin,
          { color: Colors.note, fontFamily: FontFamily.NunitoBold },
        ]}
      >
        Tin tức từ Thành Hưng
      </Text>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {data?.data?.map((value, index) => {
          return (
            <NewItem
              key={index}
              {...{
                image: value.url,
                title: value.title,
                link: value.link,
              }}
            />
          )
        })}
      </ScrollView>
    </Container>
  )
}

export default PromotionNews
