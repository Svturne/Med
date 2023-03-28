import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {showError} from '../utils/messages';

const RestPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordvalid, setPasswordValid] = useState('');
  const [sendMdpLoader, setSendMdpLoader] = useState(false);
  const sendCode = () => {
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
          console.log(password, passwordvalid);
        }
      }
    }
  };

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
        color="lightgreen"
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
