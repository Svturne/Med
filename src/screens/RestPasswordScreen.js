import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {showError, showSuccess} from '../utils/messages';
import {axiosInstance} from '../config/axios';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors';

const RestPassword = ({route}) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [passwordvalid, setPasswordValid] = useState('');
  const [sendMdpLoader, setSendMdpLoader] = useState(false);

  const email = route.params.email;
  const code = route.params.code;

  const sendCode = useCallback(() => {
    if (password === '' || passwordvalid === '') {
      showError('Remplissez tous les champs requis');
    } else {
      if (password != passwordvalid) {
        showError('Les deux mots de passe ne correspondant pas');
      } else {
        var regularMdp =
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (regularMdp.test(password) == false) {
          showError('Mauvais format de mot de passe');
        } else {
          setSendMdpLoader(true);
          axiosInstance
            .post('/medecin/resetpassword', {
              email,
              code,
              password,
            })
            .then(response => {
              console.log(response.data);
              navigation.navigate('Login');
              showSuccess('Votre mot de passe a été modifié avec succès.');
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {
              setSendMdpLoader(false);
            });
        }
      }
    }
  }, [password, passwordvalid]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Changer votre mot de passe</Text>
      <CustomInput
        nameOfInpute="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secure={true}
      />
      <CustomInput
        nameOfInpute="Confirmer votre Mot de passe"
        value={passwordvalid}
        onChangeText={setPasswordValid}
        secure={true}
      />

      <CustomButton
        text="Valider"
        color={colors.lightgreen}
        isLoading={sendMdpLoader}
        func={sendCode}
      />
    </View>
  );
};

export default RestPassword;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.blue,
    paddingTop: 50,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 45,
  },
});
