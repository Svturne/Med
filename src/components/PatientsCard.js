import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const PatientsCard = props => {
  const navigation = useNavigation();
  const showPatient = () => {
    navigation.navigate('ProfilePatient', {data: props.data});
  };

  return (
    <TouchableOpacity
      onPress={showPatient}
      style={[
        styles.card,
        {
          backgroundColor:
            props.data.sexe === 'man'
              ? '#85CDFD'
              : props.data.sexe === 'woman'
              ? 'pink'
              : 'white',
        },
      ]}
      key={props.data.id}>
      <Text style={styles.cardTitle}>
        {props.data.first_name} {props.data.last_name}
      </Text>
      <Text style={styles.cardText}>{props.data.email}</Text>
      <Text style={styles.cardText}>{props.data.age} ans</Text>
      <Text style={styles.cardText}>{props.data.sexe}</Text>
    </TouchableOpacity>
  );
};

export default PatientsCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginHorizontal: 25,
    marginVertical: 10,
    borderRadius: 10,
  },
  cardTitle: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
