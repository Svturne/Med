import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';

const Visites = ({route}) => {
  const data = route.params.data;
  return (
    <View style={styles.container}>
      <Text>{data.title}</Text>
    </View>
  );
};

export default Visites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    width: '100%',
    height: '100%',
    paddingTop: 50,
    padding: 20,
  },
});
