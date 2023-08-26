import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { theme } from '../core/theme';

const itemsPerPage = 10;

export const Table = ({ customersData }) => {
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage > customersData.length ? customersData.length : (page + 1) * itemsPerPage;

  return (
    <ScrollView style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Number</DataTable.Title>
          <DataTable.Title>Question</DataTable.Title>
          <DataTable.Title>Solved</DataTable.Title>
          <DataTable.Title>Rating</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {customersData.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.number || '000-00-00-00'}</DataTable.Cell>
            <DataTable.Cell>{item.answers[0].question}</DataTable.Cell>
            <DataTable.Cell>{item.answers[2].answer}</DataTable.Cell>
            <DataTable.Cell>
              <View>
                <Rating
                  tintColor={'whitesmoke'}
                  readonly={true}
                  type='custom'
                  ratingCount={5}
                  imageSize={30}
                  startingValue={item.answers[1].answer}
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.date_time}</DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(customersData.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${customersData.length}`}
        />
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 90,
  },
});