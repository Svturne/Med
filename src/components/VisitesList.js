import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors';

const MaladiesList = props => {
  const navigation = useNavigation();
  const showVisitesDetail = () => {
    navigation.navigate('VisitesDetail', {data: props.data});
  };
  return (
    <TouchableOpacity onPress={showVisitesDetail} style={styles.card}>
      <Text style={styles.cardTitle}>{props.data.title}</Text>
      <Text style={styles.desc}>{props.data.remarque}</Text>
      <Text style={styles.date}>{props.data.date}</Text>
    </TouchableOpacity>
  );
};

export default MaladiesList;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.green,
    width: '80%',
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
  date: {
    color: colors.black,
    fontSize: 14,
    marginTop: 10,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  desc: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
});
