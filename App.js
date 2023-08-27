import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  Step2Screen,
  AdminPanel,
  UserDetails,
  SetPhoneNumber
} from './src/screens'
import { StatusBar } from 'react-native'

const Stack = createStackNavigator()

export default function App() {

  StatusBar.setBackgroundColor('#000000');
  
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SetPhoneNumber" component={SetPhoneNumber} />
          <Stack.Screen name="Step2Screen" component={Step2Screen} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="AdminPanel" component={AdminPanel} />
          <Stack.Screen name="UserDetails" component={UserDetails} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
