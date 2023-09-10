import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { Avatar, Card, TextInput as Input } from 'react-native-paper';
import { getItem, removeItem } from '../helpers/storageHelper'
import { env } from '../../globalConfig'

const logoutapi = env.api + 'log-out'

const phoneRegex = /^\d{8}$/;

export default function SetPhoneNumber({ navigation }) {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    getItem('user').then(e => setUser(JSON.parse(e)))
  }, [])

  useEffect(() => {
    setIsValid(phoneRegex.test(phone))
  }, [phone])


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

  const onPhoneNumberSubmit = () => {
    if (isValid) {
      navigation.reset({
        index: 0,
        routes: [{
          name: 'Dashboard',
          params: {
            phone: `+374${phone}`
          }
        }],
      })
    }
  }

  return (
    <>
      <Background>
        <View style={{ marginBottom: 30 }}>
          <Logo />
        </View>
        <Text style={styles.header}>Հեռախոսահամար</Text>

        <View style={styles.phoneInput}>

          <TextInput
            label="Phone"
            returnKeyType="next"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            autoCapitalize="none"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            left={<Input.Affix text="+374" />}
          />
        </View>

        <Button mode="contained" onPress={onPhoneNumberSubmit} disabled={!isValid}>
          Առաջ
        </Button>

      </Background>
      <View style={{ position: 'absolute', top: 40, right: 30 }}>
        <Pressable onPress={onSignOutPressed}>
          <Text
            mode="outlined"
            style={{ fontWeight: 'bold' }}
          >
            <Avatar.Icon size={40} icon="door-open" />
          </Text>
        </Pressable>
      </View>
      <View style={{ width: '50%', position: 'absolute', top: 40, left: 30 }}>
        <Card.Title
          title={`${user?.first_name} ${user?.last_name}`}
          subtitle={user?.email}
          left={(props) => <Avatar.Icon {...props} icon="human" />}
        />
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  error: {
    color: theme.colors.error,
  },
  phoneInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeBox: {
    height: '100%',
    color: 'black',
    backgroundColor: theme.colors.primary
  }
})