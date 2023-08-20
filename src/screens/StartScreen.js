import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { getItem } from '../helpers/storageHelper'
import { Text } from 'react-native'

export default function StartScreen({ navigation }) {
  const getUser = () => {
    return getItem('user');
  };
  useEffect(() => {
    getUser()
      .then(user => {
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        }
      }
      )
  }, [])

  return (
    <Background>
      <Text>Loading...</Text>
    </Background>
  )
}