import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import doctorPic from '../../assets/images/doctor.png';
import colors from '../../assets/colors';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.mainContainer}>
      <Image source={doctorPic} style={styles.image} />
      <View style={styles.container}>
        <View style={{backgroundColor: colors.green, justifyContent: 'center'}}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{padding: 10}}
          />
        </View>
        <View style={{backgroundColor: colors.green, justifyContent: 'center'}}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={{padding: 10}}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
  },
  container: {
    backgroundColor: colors.blue,
    flex: 1,
    justifyContent: 'space-around',
  },
});
