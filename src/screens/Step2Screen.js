import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import { removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';
import { Rating } from 'react-native-ratings';
import { theme } from '../core/theme';
import Logo from '../components/Logo';

const logoutapi = env.api + 'log-out'

const Step2Screen = ({ navigation, route }) => {
  const selectedItem = route.params.selectedItem;

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

  const ratingCompleted = (e) => {
    console.log(e, 'eleleme')
  }

  return (
    <Background>
      <View style={{ position: 'absolute', top: 100 }}>
        <Logo />
      </View>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Text style={styles.typography}>Արդյո՞ք լուծվեց խնդիրը</Text>
      <TouchableOpacity style={styles.answer}>
        <Text style={styles.answerText}>Այո</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer}>
        <Text style={styles.answerText}>Ոչ</Text>
      </TouchableOpacity>
      <View style={{height: 50}}></View>
      <Text style={styles.typography}>Գնահատեք օպերատորի աշխատանքը</Text>
      <Rating
        type='custom'
        ratingCount={5}
        imageSize={50}
        startingValue={0}
        ratingColor='#ffc800'
        onFinishRating={ratingCompleted}
      />
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
    fontSize: 22,
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
