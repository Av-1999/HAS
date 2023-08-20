import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { getItem, removeItem } from '../helpers/storageHelper'
import { env } from '../../globalConfig'

const logoutapi = env.api + 'log-out'

export default function Dashboard({ navigation }) {

  const getUser = () => {
    return getItem('user');
  };
  useEffect(() => {
    getUser()
      .then(user => {
        if (!user) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        } else {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Step1Screen' }],
            })
          }, 2000)
        }
      })
  }, [])

  const onSignOutPressed = () => {
    fetch(logoutapi, {
      method: 'POST'
    })
      .then(async (response) => {
        if (response.ok) {
          await removeItem('user');
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        }
      })
  }

  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>

      <Button
        mode="outlined"
        onPress={onSignOutPressed}
      >
        Sign out
      </Button>
    </Background>
  )
}

// eas build -p android --profile preview