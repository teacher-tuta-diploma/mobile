import {} from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '@/Components/Container'
import OptionItem from '@/Components/Option/OptionItem'

const Gender = ({ onChangeGender, defaultGender }: any) => {
  const [isSelect, setIsSelect] = useState<'MALE' | 'FEMALE' | undefined>()

  useEffect(() => {
    if (defaultGender) {
      setIsSelect(defaultGender)
    }
  }, [defaultGender])

  return (
    <Container>
      <OptionItem
        onPress={() => {
          setIsSelect('MALE')
          onChangeGender('MALE')
        }}
        title="Nam"
        // onPress={(isChecked: boolean) => onPressItem(t, isChecked)}
        isChecked={isSelect === 'MALE'}
        note=""
        price=""
      />
      <OptionItem
        onPress={() => {
          setIsSelect('FEMALE')
          onChangeGender('FEMALE')
        }}
        title="Nữ"
        // onPress={(isChecked: boolean) => onPressItem(t, isChecked)}
        isChecked={isSelect === 'FEMALE'}
        note=""
        price=""
      />
    </Container>
  )
}

export default Gender
