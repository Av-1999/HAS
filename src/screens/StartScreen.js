import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { getItem } from '../helpers/storageHelper'
import { Text } from 'react-native'
import { Loading } from '../components/Loading'

export default function StartScreen({ navigation }) {
  const getUser = () => {
    return getItem('user');
  };
  useEffect(() => {
    getUser()
      .then(e=> JSON.parse(e))
      .then(user => {
        if (user) {
          if (user.role === 'admin') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'AdminPanel' }],
            })
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'SetPhoneNumber' }],
            })
          }
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
      {/* <Loading /> */}
    </Background>
  )
}