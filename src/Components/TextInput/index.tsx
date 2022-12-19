import { TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@/Hooks'
import { TextFiledProps } from './type'
import Container from '../Container'
import Image from '../Image'
import { Touchable } from '../Touchable'

const TextField = ({
  renderLeftAccessory,
  renderRightAccessory,
  style,
  inputStyle,
  secureTextEntry,
  ...other
}: TextFiledProps) => {
  const { Layout, Common, Colors, MetricsSizes, Images, FontSize } = useTheme()
  const textInputRef = useRef<TextInput>(null)
  const [isShowPassword, setisShowPassword] = useState<boolean>(false)

  if (secureTextEntry) {
    return (
      <View style={[Common.textInput, Layout.rowHCenter, style]}>
        {renderLeftAccessory?.()}
        <Container ml={MetricsSizes.tiny} flex={1}>
          <TextInput
            placeholderTextColor={Colors.placeHolder}
            placeholder={other.placeholder}
            secureTextEntry={!isShowPassword}
            defaultValue={other.defaultValue}
            style={[
              inputStyle,
              {
                height: MetricsSizes.small * 3,
                paddingVertical: 0,
                fontSize: FontSize.tiny,
              },
            ]}
            {...other}
            ref={textInputRef}
          />
        </Container>
        <Touchable
          onPress={() => setisShowPassword(v => !v)}
          mr={MetricsSizes.tiny}
        >
          <Image
            w={MetricsSizes.small}
            h={MetricsSizes.small}
            source={!isShowPassword ? Images.close_eye : Images.open_eye}
            resizeMode={'contain'}
            tintColor={Colors.grey}
          />
        </Touchable>
      </View>
    )
  }
  return (
    <View style={[Common.textInput, Layout.rowHCenter, style]}>
      {renderLeftAccessory?.()}
      <Container ml={MetricsSizes.tiny} flex={1}>
        <TextInput
          placeholderTextColor={Colors.placeHolder}
          placeholder={other.placeholder}
          secureTextEntry={secureTextEntry}
          defaultValue={other.defaultValue}
          {...other}
          style={[
            {
              height: MetricsSizes.small,
              paddingVertical: 0,
              fontSize: FontSize.tiny,
            },
            inputStyle,
          ]}
          ref={textInputRef}
        />
      </Container>
      {renderRightAccessory?.()}
    </View>
  )
}

export default TextField
