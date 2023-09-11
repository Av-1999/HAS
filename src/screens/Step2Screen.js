import React, { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background'
import { getItem, removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';
import { Rating } from 'react-native-ratings';
import Logo from '../components/Logo';
import { Loading } from '../components/Loading';
import { Avatar, Card } from 'react-native-paper';

const storesurveyapi = env.api + 'update-survey'
const logoutapi = env.api + 'log-out';

const Step2Screen = ({ navigation, route }) => {
  const [resolved, setResolved] = useState(0);
  const [rate, setRate] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingGlobal, setLoadingGlobal] = useState(false);

  useLayoutEffect(() => {
    getItem('user').then(user => setUser(JSON.parse(user)));
  }, [])

  // const selectedItem = route.params.selectedItem;
  // const phone = route.params.phone;

  const requestBody = {
    user_id: user?.id,
    answers_ids: `${rate},${resolved}`
  };

  const onSubmitPressed = () => {
    setLoading(true);
    fetch(storesurveyapi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(requestBody), // Stringify the body
    })
      .then(async (response) => {
        if (response.ok) {
          setLoading(false)
          setLoadingGlobal(true)
          setTimeout(() => {
            setLoadingGlobal(false)
            navigation.reset({
              index: 0,
              routes: [{ name: 'Step2Screen' }],
            })
          }, 2000);
        }

      })
      .catch(async () => {
        setLoading(false)
      })
  }

  const ratingCompleted = (e) => {
    setRate(e + 4)
  }

  const onResolved = (e) => {
    setResolved(e)
  }

  const onSignOutPressed = () => {
    fetch(logoutapi, {
      method: 'POST'
    })
      .then(async (response) => {
        await removeItem('user');
        navigation.reset({
          routes: [{ name: 'LoginScreen' }],
        })
      })
  }

  const button1Style = resolved == 10 ? styles.clicked : {}
  const button2Style = resolved == 11 ? styles.clicked : {}
  const disabled = resolved !== 0 && rate !== 0 ? false : true

  if (loadingGlobal) return <Loading />
  return (
    <>
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
            loading={loading}
            disabled={disabled}
          >
            Ուղարկել
          </Button>
        </View>

      </Background>
      <View style={{ position: 'absolute', top: 50, right: 20 }}>
        <Text
          mode="outlined"
          onPress={onSignOutPressed}
          style={{ fontWeight: 'bold' }}
        >
          <Avatar.Icon size={40} icon="door-open" />
        </Text>
      </View>
      <View style={{ width: '50%', position: 'absolute', top: 40, left: 30 }}>
        <Card.Title
          title={`${user?.first_name} ${user?.last_name}`}
          subtitle={user?.email}
          left={(props) => <Avatar.Icon {...props} icon="human" />}
        />
      </View>
    </>
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
