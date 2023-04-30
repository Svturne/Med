import {color} from '@rneui/base';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const PatientScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Bienvenue sur l'application Med</Text>
    <ActivityIndicator size={60} color={colors.white} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blue,
    alignItems: 'center',
    padding: 16,
  },

  title: {
    marginBottom: 55,
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.white,
  },
});

export default PatientScreen;
