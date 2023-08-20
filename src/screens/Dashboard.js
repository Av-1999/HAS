import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { getItem } from '../helpers/storageHelper'

export default function Dashboard({ navigation }) {
  const user = async () => await getItem('user');

  console.log(user(), 'sssss')
  useEffect(() => {
    if (!user()) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    }

  }, [user()])

  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>

      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Sign out
      </Button>
    </Background>
  )
}

// eas build -p android --profile preview