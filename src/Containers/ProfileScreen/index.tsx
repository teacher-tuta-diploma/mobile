import { useTheme } from '@/Hooks'
import React, { useMemo } from 'react'
import Container from '@/Components/Container'
import { FlatList } from 'react-native-gesture-handler'
import ProfileItem from './components/ProfileItem'
import Header from '@/Components/Header'

const ProfileScreen = () => {
  const { Colors, Gutters } = useTheme()
  const data = useMemo(
    () => [
      {
        name: 'ABC profile',
        lastTime: '15s',
        tags: ['Figma', 'Uxwing', 'Adobe', 'Canva'],
        numberOnline: 2,
        totalOnline: 4,
      },
      {
        name: 'ABC profile',
        lastTime: '17s',
        tags: ['Figma', 'Uxwing', 'Adobe', 'Canva'],
        numberOnline: 2,
        totalOnline: 4,
      },
      {
        name: 'ABC profile',
        lastTime: '30s',
        tags: ['Figma', 'Uxwing', 'Adobe', 'Canva'],
        numberOnline: 2,
        totalOnline: 4,
      },
      {
        name: 'ABC profile',
        lastTime: '1p',
        tags: ['Figma', 'Uxwing', 'Adobe', 'Canva'],
        numberOnline: 2,
        totalOnline: 4,
      },
      {
        name: 'ABC profile',
        lastTime: '1d',
        tags: ['Figma', 'Uxwing', 'Adobe', 'Canva'],
        numberOnline: 2,
        totalOnline: 4,
      },
    ],
    [],
  )

  return (
    <Container bg={Colors.black} flex={1} style={[Gutters.smallHPadding]}>
      <Header title="Danh tính" noBack textLarge />
      <FlatList
        data={data}
        renderItem={({ item }) => <ProfileItem {...item} />}
      />
    </Container>
  )
}

export default ProfileScreen
