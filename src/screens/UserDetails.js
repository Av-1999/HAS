import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { removeItem } from '../helpers/storageHelper';
import { env } from '../../globalConfig';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { Loading } from '../components/Loading';
import { Table } from '../components/Table';
import DateRangePicker from "rn-select-date-range";
import moment from 'moment'
import { Dialog, Portal } from 'react-native-paper';

const adminPanelApi = env.api + 'get-surveys/';

export default function UserDetails({ navigation, route }) {

  const userId = route.params.userId;

  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateLoading, setDateLoading] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [submitable, setSubmitable] = useState(false);
  const [dateValue, setDateValue] = useState({});

  const fetchDefaultData = () => {
    setLoading(true)
    fetch(`${adminPanelApi}${userId}?start=${moment().format('YYYY-MM-DD')}&end${moment().format('YYYY-MM-DD')}`, {
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
    setDateValue({})
  }

  useEffect(() => {
    setSubmitable(false)
  }, [openDatePicker])

  useEffect(() => {
    fetchDefaultData()
  }, [])

  const onSortPress = () => {
    setOpenDatePicker(true)
  }

  const selectDate = (data) => {
    setDateValue({
      startDate: data.firstDate,
      endDate: data.secondDate
    })
    setSubmitable(true)
  }

  const confirmDateFilter = (data) => {
    setSubmitable(false);
    setDateLoading(true);
    setOpenDatePicker(false);
    fetch(`${adminPanelApi}${userId}?start=${dateValue.startDate}&end=${dateValue.endDate}`, {
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
        setDateLoading(false)
      })
      .catch(e => {
        setDateLoading(false)
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
      <View style={{ top: 50 }}>
        <Text>{dateValue.startDate || moment().format('DD MMM YYYY')} to {dateValue.endDate || moment().format('DD MMM YYYY')}</Text>
      </View>
      <Table customersData={userDetails} />
      <Portal>
        <Dialog visible={openDatePicker} onDismiss={() => setOpenDatePicker(false)}>
          <Dialog.Content>
            <DateRangePicker
              blockSingleDateSelection={false}
              responseFormat="DD MMM YYYY"
              maxDate={moment()}
              onClear={() => setSubmitable(false)}
              confirmBtnTitle={submitable ? "Confirm" : ""}
              // minDate={moment().subtract(100, "days")}
              selectedDateContainerStyle={styles.selectedDateContainerStyle}
              selectedDateStyle={styles.selectedDateStyle}
              onSelectDateRange={selectDate}
              onConfirm={confirmDateFilter}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={{ position: 'absolute', top: 50, right: 20 }}>
        <Pressable onPress={onSortPress}>
          {dateLoading ?
            <ActivityIndicator size={"small"} animating={true} color={'#ffc800'} />
            :
            <View style={{ flexDirection: 'row' }}>
              <Pressable onPress={fetchDefaultData}>
                <Avatar.Icon style={{ marginRight: 10 }} size={40} icon="reload" />
              </Pressable>
              <Avatar.Icon size={40} icon="sort" />
            </View>
          }
        </Pressable>
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
  datePicker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
});
// eas build -p android --profile preview
