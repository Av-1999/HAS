import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';
import { Loading } from '../components/Loading';
import { Card, Avatar } from 'react-native-paper';
import { ProgressBar } from '../components/ProgressBar';

const adminPanelApi = env.api + 'get-users';
const logoutapi = env.api + 'log-out';

export default function AdminPanel({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true)
    fetch(adminPanelApi, {
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
        setUsers(data.users)
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

  const onUserSelect = (item) => {
    navigation.reset({
      index: 0,
      routes: [{
        name: 'UserDetails',
        params: {
          userId: item.id
        }
      }],
    })
  }

  if (loading) return <Loading />
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {users.map((item, index) => (
          <Pressable onPress={() => onUserSelect(item)}>
            <Card.Title
              style={{paddingRight: 15}}
              title={item.first_name}
              subtitle={item.email}
              left={(props) => <Avatar.Icon {...props} icon="human" />}
              right={(props) => <ProgressBar percent={item.average_stars.toFixed(0)} />}
            />
          </Pressable>
        ))}
      </ScrollView>
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
    // paddingTop: getStatusBarHeight()
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
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 90,
  }
});
// eas build -p android --profile preview
