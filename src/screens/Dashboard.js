import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import { getItem } from '../helpers/storageHelper'

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

  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>
    </Background>
  )
}

// eas build -p android --profile preview