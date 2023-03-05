import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PatientScreen = ({route}) => {
  return (
    <View>
      <Text style={{color: 'black'}}>PatientScreen ID: {route.params.id}</Text>
    </View>
  );
};

export default PatientScreen;

const styles = StyleSheet.create({});
