import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {showError} from '../utils/messages';
import {useNavigation} from '@react-navigation/native';
import instance from '../config/instance';

const MailPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [sendEmailLoading, setSendEmailLoading] = useState(false);

  const sendEmail = useCallback(() => {
    if (email == '') {
      showError('Remplissez le champ requis');
      return;
    }

    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (regEmail.test(email) == false) {
      showError("Mauvais format d'e-mail");
      return;
    }

    setSendEmailLoading(true);

    instance
      .post('/medecin/sendcode', {
        email,
      })
      .then(response => {
        console.log(response.data);
        navigation.navigate('CodePassword', {email});
      })
      .catch(error => {
        console.log(error);
        //console.log(error.response.status);
      })
      .finally(() => {
        setSendEmailLoading(false);
      });
  }, [email]);

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Récuperer votre compte</Text>
      <CustomInput
        nameOfInpute="Adresse email"
        value={email}
        onChangeText={setEmail}
        secure={false}
        keyboardType="email-address"
      />
      <CustomButton
        text="Valider"
        color="lightgreen"
        isLoading={sendEmailLoading}
        func={sendEmail}
      />
    </View>
  );
};

export default MailPassword;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.blue,
    paddingTop: 50,
    padding: 20,
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 90,
  },
});
