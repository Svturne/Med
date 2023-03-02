import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import doctorPic from '../../assets/images/doctor.png';
import colors from '../../assets/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.mainContainer}>
      <Image source={doctorPic} style={styles.image} />

      <View style={styles.container}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            color: colors.black,
          }}>
          Hello Doctor!
        </Text>
        <Text style={{alignSelf: 'center', fontSize: 15}}>
          please enter your information
        </Text>
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
        <TouchableOpacity>
          <Text style={{alignSelf: 'flex-end', fontSize: 12}}>
            Recovery Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <CustomButton text="Sign In" color="lightgreen" />
        </TouchableOpacity>
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
