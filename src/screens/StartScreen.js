import React, { useEffect } from 'react'
import Background from '../components/Background'
import { getItem } from '../helpers/storageHelper'

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
          } else if (user.role === 'terminal') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'SetPhoneNumber' }],
            })
          }else if (user.role === 'user') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Step2Screen' }],
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