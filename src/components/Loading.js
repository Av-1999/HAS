import React from "react";
import { StyleSheet, View } from "react-native"
import { ActivityIndicator } from "react-native-paper";

export const Loading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} animating={true} color={'#ffc800'} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});