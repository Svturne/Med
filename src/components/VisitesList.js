import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors';
import {format} from 'fecha';

const MaladiesList = props => {
  const navigation = useNavigation();
  const showVisitesDetail = () => {
    navigation.navigate('VisitesDetail', {data: props.data});
  };
  const date = format(new Date(props.data.createdAt), 'DD-MM-YYYY');
  return (
    <TouchableOpacity onPress={showVisitesDetail} style={styles.card}>
      <Text style={styles.cardTitle}>{props.data.remarque}</Text>
      <Text numberOfLines={1} style={styles.desc}>
        {props.data.desc}{' '}
      </Text>
      <Text style={styles.date}>{date}</Text>
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
    backgroundColor: colors.lightgreen,
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
