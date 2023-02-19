import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import doctorPic from '../../assets/images/doctor.png';
const Login = () => {
  return (
    <View>
      <Image source={doctorPic} style={styles.image} />
      <View style={styles.container}></View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
  container: {
    backgroundColor: 'red',
  },
});
