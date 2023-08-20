import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import { removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';

const logoutapi = env.api + 'log-out'

const Step2Screen = ({ navigation }) => {
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
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Text style={styles.typography}>Արդյո՞ք լուծվեց խնդիրը</Text>
      <TouchableOpacity style={styles.answer}>
        <Text style={styles.answerText}>Այո</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer}>
        <Text style={styles.answerText}>Ոչ</Text>
      </TouchableOpacity>
      <Text style={styles.typography}>Գնահատեք օպերատորի աշխատանքը</Text>
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
  typography: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
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

export default Step2Screen;
