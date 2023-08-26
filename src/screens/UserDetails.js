import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import { Text, StyleSheet, View } from 'react-native';
import { removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';
import { Avatar } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { Loading } from '../components/Loading';
import { Table } from '../components/Table';

const adminPanelApi = env.api + 'get-surveys/';
const logoutapi = env.api + 'log-out';

export default function UserDetails({ navigation, route }) {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = route.params.userId;

  useEffect(() => {
    setLoading(true)
    fetch(adminPanelApi + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(async (data) => {
        setUserDetails(data)
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
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

  const goTo = () => {
    navigation.reset({
      routes: [{ name: 'AdminPanel' }],
    })
  }
  if (loading) return <Loading />
  return (
    <View style={styles.container}>
      <BackButton goBack={goTo} />

      <Table customersData={userDetails}/>

      <View style={{ position: 'absolute', top: 50, right: 20 }}>
        <Text
          mode="outlined"
          onPress={onSignOutPressed}
          style={{ fontWeight: 'bold' }}
        >
          <Avatar.Icon size={40} icon="door-open" />
        </Text>
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answer: {
    width: 200,
    height: 40,
    backgroundColor: '#FFC800',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  answerText: {
    color: 'white',
    fontSize: 16,
  },
});
// eas build -p android --profile preview
