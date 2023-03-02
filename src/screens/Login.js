import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import doctorPic from '../../assets/images/doctor.png';
import colors from '../../assets/colors';
import CustomInput from '../components/CustomInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.mainContainer}>
      <Image source={doctorPic} style={styles.image} />
      <View style={styles.container}>
        <CustomInput
          nameOfInpute="Adresse email"
          value={email}
          onChangeText={setEmail}
          secure={false}
        />
        <CustomInput
          nameOfInpute="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secure={true}
        />
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
    padding: 16,
  },
});
