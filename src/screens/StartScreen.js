import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {

  const user = ''

  useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }
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