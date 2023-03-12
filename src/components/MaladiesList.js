import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const MaladiesList = props => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{props.data.title}</Text>
    </TouchableOpacity>
  );
};

export default MaladiesList;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    width: 150,
    backgroundColor: '#f3f2f15e',
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
});
