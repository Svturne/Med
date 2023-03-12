import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
    flex: 1 / 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    margin: 5,
    marginBottom: 40,
    borderRadius: 16,
    backgroundColor: '#f3f2f15e',
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
