import { Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Container from '@/Components/Container'
import { useTheme } from '@/Hooks'
import { Touchable } from '@/Components/Touchable'
import Image from '@/Components/Image'
import { Menu, MenuItem } from 'react-native-material-menu'

type Props = {
  setValue?: (text: string) => void
  datas: string[]
  value: string
  renderLeftAccessory?: () => JSX.Element
}

const SelectBox = ({ setValue, datas, value, renderLeftAccessory }: Props) => {
  const { Fonts, MetricsSizes, Colors, Images, Common, Layout } = useTheme()

  const HEIGHT_DROPBOX = 300
  const [visible, setVisible] = useState(false)

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)
  return (
    <Container style={[Common.textInput, Layout.rowHCenter]}>
      {renderLeftAccessory?.()}
      <Container flex={1} ml={MetricsSizes.tiny}>
        <Text style={[Fonts.textTiny, { color: Colors.black }]}>{value}</Text>
      </Container>
      <Touchable onPress={showMenu}>
        <Container flexDr="row" ai="center" mh={MetricsSizes.tiny}>
          <Container mh={MetricsSizes.tiny} bg={Colors.grey} w={1} h={30} />

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
              {datas.map((p, i) => {
                return (
                  <MenuItem
                    key={i}
                    onPress={() => {
                      setValue?.(p)
                      hideMenu()
                    }}
                  >
                    {p}
                  </MenuItem>
                )
              })}
            </ScrollView>
          </Menu>
        </Container>
      </Touchable>
    </Container>
  )
}

export default SelectBox
