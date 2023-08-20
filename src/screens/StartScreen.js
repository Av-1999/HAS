import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { getItem } from '../helpers/storageHelper'

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
        }
      }
    )
  }, [])

  return (
    <Background>
      <Logo />
      <Header>Engine</Header>
      {/* <Paragraph>
          A simple React Native Expo Login template app.
        </Paragraph> */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Log in
      </Button>
      {/* <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Create an account
      </Button> */}
    </Background>
  )
}