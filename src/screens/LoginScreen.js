import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { env } from '../../globalConfig'
import { getItem, setItem } from '../helpers/storageHelper'
import { Loading } from '../components/Loading'
import { ActivityIndicator } from 'react-native-paper'

const loginapi = env.api + 'login'

export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState({ error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false);

  const onLoginPressed = () => {
    setLoading(true);
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setLoading(false);
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    fetch(loginapi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(async (data) => {
        setLoading(false);
        setItem('user', data.user)
        if (data.user.role === 'admin') {
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
      })
      .catch(error => {
        setLoading(false);
        setCredentials({ error: 'Invalid Credentials' })
        console.error('Login error:', error);
      });
  }

  return (
    <Background>
      <View style={{ marginBottom: 30 }}>
        <Logo />
      </View>
      <Text style={styles.header}>Բարի գալուստ</Text>
      <View>
        <Text style={styles.error}>
          {credentials?.error}
        </Text>
      </View>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          {/* <Text style={styles.forgot}>Forgot your password ?</Text> */}
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} disabled={loading} loading={loading}>
          Log in
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: theme.colors.error,
  }
})