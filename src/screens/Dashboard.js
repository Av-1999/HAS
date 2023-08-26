import React, { useEffect } from 'react'
import Background from '../components/Background'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';
import Logo from '../components/Logo';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Avatar } from 'react-native-paper';

const logoutapi = env.api + 'log-out'

export default function Dashboard({ navigation }) {

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

  const onClickItem = (item) => {

    navigation.reset({
      index: 0,
      routes: [{
        name: 'Step2Screen',
        params: {
          selectedItem: item
        }
      }],
    })
  }

  return (<>
    <Background>
      <View style={{ marginBottom: 30 }}>
        <Logo />
      </View>
      <Text style={styles.header}>Ընտրեք ծառայությունը</Text>
      <TouchableOpacity style={styles.answer} onPress={() => onClickItem(1)}>
        <Text style={styles.answerText}>Գրանցում</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer} onPress={() => onClickItem(2)}>
        <Text style={styles.answerText}>Պայմանագրի կնքում</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer} onPress={() => onClickItem(3)}>
        <Text style={styles.answerText}>Տեխնիկական խնդիր</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer} onPress={() => onClickItem(4)}>
        <Text style={styles.answerText}>Այլ</Text>
      </TouchableOpacity>
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
  </>
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