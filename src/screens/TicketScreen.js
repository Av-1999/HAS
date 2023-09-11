import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import { env } from '../../globalConfig';
import Background from '../components/Background';
import { Loading } from '../components/Loading';
import Logo from '../components/Logo';
import { theme } from '../core/theme';

const getTicket = env.api + 'get-ticket'
const storeSurveyApi = env.api + 'store-survey'

export default function TicketScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState('');

  const answerId = route.params.selectedItem
  const phone = route.params.phone

  const storeSurvey = (ticket) => {
    fetch(storeSurveyApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answers_ids: answerId,
        phone,
        ticket
      })
    })
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${getTicket}?answer_id=${answerId}`, {
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
        setTicket(data.ticket)
        setLoading(false)
        storeSurvey(data.ticket)
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SetPhoneNumber' }],
          })
        }, 5000);
      })
      .catch(e => {
        setLoading(false)
      })
  }, [])

  if (loading) return <Loading />
  return (
    <Background>
      <View style={{ marginBottom: 30 }}>
        <Logo />
      </View>
      <Text style={styles.header}>Հերթական կտրոն</Text>

      <View style={styles.ticketBox}>
        <Text style={styles.ticket}>{ticket || 'B-99'}</Text>
      </View>

    </Background>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: getStatusBarHeight()
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 90,
  },
  ticket: {
    width: '100%',
    textAlign: 'center',
    fontSize: 58,
    color: theme.colors.primary,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ticketBox: {
    // borderWidth: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    marginTop: 30
  }
});
// eas build -p android --profile preview
