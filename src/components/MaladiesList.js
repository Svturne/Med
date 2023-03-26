import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import colors from '../../assets/colors';

const MaladiesList = props => {
  const navigation = useNavigation();
  const showVisites = () => {
    navigation.navigate('Visites', {data: props.data});
  };
  return (
    <TouchableOpacity onPress={showVisites} style={styles.card}>
      <Text style={styles.cardTitle}>{props.data.title}</Text>
      <Text style={styles.date}>{props.data.date}</Text>
    </TouchableOpacity>
  );
};

export default MaladiesList;

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
