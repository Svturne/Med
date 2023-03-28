import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CodePassword = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
      <TextInput style={styles.input} />
      <TextInput style={styles.input} />
      <TextInput style={styles.input} />
    </View>
  );
};

export default CodePassword;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.blue,
    paddingTop: 50,
    padding: 20,
  },
  input: {
    backgroundColor: colors.white,
    padding: 10,
    width: 40,
    textAlign: 'center',
  },
});
