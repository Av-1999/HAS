import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import { getItem, removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';
import { Rating } from 'react-native-ratings';
import { theme } from '../core/theme';
import Logo from '../components/Logo';

const storesurveyapi = env.api + 'store-survey'

const Step2Screen = ({ navigation, route }) => {
  const [resolved, setResolved] = useState(0);
  const [rate, setRate] = useState(0);
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    getItem('user').then(user => setUser(JSON.parse(user)));
  }, [])

  const selectedItem = route.params.selectedItem;

  const requestBody = {
    user_id: user?.id,
    answers_ids: `${selectedItem},${rate},${resolved}`
  };

  const onSubmitPressed = () => {
    fetch(storesurveyapi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(requestBody), // Stringify the body
    })
      .then(async (response) => {
        if (response.ok) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        }
      })
    // console.log(selectedItem, rate, resolved)
  }

  const ratingCompleted = (e) => {
    console.log(e + 5)
    setRate(e + 5)
  }

  const onResolved = (e) => {
    console.log(e)
    setResolved(e)
  }
  const button1Style = resolved == 10 ? styles.clicked : {}
  const button2Style = resolved == 11 ? styles.clicked : {}
  const disabled2 = resolved !== 0 && rate !== 0 ? false : true
  return (
    <Background>
      <View style={{ marginBottom: 30 }}>
        <Logo />
      </View>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Text style={styles.typography}>Արդյո՞ք լուծվեց խնդիրը</Text>
      <TouchableOpacity style={[styles.answer, button1Style]} onPress={() => onResolved(10)}>
        <Text style={[styles.answerText, button1Style]}>Այո</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.answer, button2Style]} onPress={() => onResolved(11)}>
        <Text style={[styles.answerText, button2Style]}>Ոչ</Text>
      </TouchableOpacity>
      <View style={{ height: 50 }}></View>
      <Text style={styles.typography}>Գնահատեք օպերատորի աշխատանքը</Text>
      <Rating
        type='custom'
        ratingCount={5}
        imageSize={50}
        startingValue={0}
        ratingColor='#ffc800'
        onFinishRating={ratingCompleted}
      />
      <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
        <Button
          mode="outlined"
          onPress={onSubmitPressed}
          style={{ borderColor: '#ffc800' }}
          disabled={disabled2}
        >
          Ուղարկել
        </Button>
      </View>
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
  clicked: {
    backgroundColor: '#fff',
    color: "#FFC800",
  }
});

export default Step2Screen;
