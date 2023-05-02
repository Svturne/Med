import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import {format} from 'fecha';

const PatientMaladiesList = props => {
  const navigation = useNavigation();
  const showPatientVisites = () => {
    navigation.navigate('PatientVisite', {data: props.data});
  };
  const date = format(new Date(props.data.createdAt), 'DD-MM-YYYY');
  return (
    <TouchableOpacity onPress={showPatientVisites} style={styles.card}>
      <Text style={styles.cardTitle}>{props.data.maladie}</Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

export default PatientMaladiesList;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    width: 150,
    backgroundColor: colors.whiteAlpha,
    padding: 5,
  },
  cardTitle: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.bold,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
});
