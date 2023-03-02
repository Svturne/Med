import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import doctorPic from '../../assets/images/doctor.png';
import colors from '../../assets/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import fonts from '../../assets/fonts/fonts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInLoading, setsignInLoading] = useState(false);

  const signIn = useCallback(() => {
    setsignInLoading(true);
    setTimeout(() => {
      setsignInLoading(false);
    }, 2000);
  }, [email, password]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Image source={doctorPic} style={styles.image} />

        <View style={styles.container}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: fonts.bold,
              fontSize: 24,
              color: colors.white,
            }}>
            Hello Doctor!
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
          <CustomButton
            text="Sign In"
            color="lightgreen"
            isLoading={signInLoading}
            func={signIn}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.blue,
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
