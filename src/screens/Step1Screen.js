import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background'
import { removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';

const logoutapi = env.api + 'log-out'

const Step1Screen = ({navigation}) => {
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
  return (
    <Background>
      <Text style={styles.header}>Ընտրեք ծառայությունը</Text>
      <TouchableOpacity style={styles.answer}>
        <Text style={styles.answerText}>Գրանցում</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer}>
        <Text style={styles.answerText}>Պայմանագրի կնքում</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer}>
        <Text style={styles.answerText}>Տեխնիկական խնդիր</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer}>
        <Text style={styles.answerText}>Այլ</Text>
      </TouchableOpacity>
      <Button
        mode="outlined"
        onPress={onSignOutPressed}
      >
        Sign out
      </Button>
    </Background>
  );
};

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
    borderRadius: "5px",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  answerText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Step1Screen;
