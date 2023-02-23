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
        <Text>Adresse email</Text>
        <View style={{backgroundColor: colors.green, justifyContent: 'center'}}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{padding: 10}}
          />
        </View>
        <Text>Mot de passe</Text>
        <View style={{backgroundColor: colors.green, justifyContent: 'center'}}>
          <TextInput
            value={password}
            secureTextEntry={true}
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
