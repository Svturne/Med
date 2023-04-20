import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import CustomInput from '../components/CustomInput';
import CustomDropList from '../components/CustomDropList';
import CustomButton from '../components/CustomButton';
import instance, {axiosPrivate} from '../config/axios';
import {useNavigation} from '@react-navigation/native';

const CreatePatient = () => {
  const [sexe, setsexe] = useState('');
  const [createPatientLoader, setCreatePatientLoader] = useState(false);
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const navigation = useNavigation();

  const data = [
    {key: '1', value: 'Masculin'},
    {key: '2', value: 'Féminin'},
  ];

  const create = useCallback(() => {
    setCreatePatientLoader(true);
    axiosPrivate
      .post('/patient/', {
        name,
        email,
        age,
        sexe,
      })
      .then(response => {
        console.log(response.data);
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setCreatePatientLoader(false);
      });
  }, [name, email, age, sexe]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Ajouter un nouveau patient</Text>
      <CustomInput
        nameOfInpute="Nom"
        value={name}
        onChangeText={setname}
        secure={false}
      />
      <CustomInput
        nameOfInpute="Email"
        value={email}
        onChangeText={setEmail}
        secure={false}
        keyboardType="email-address"
      />
      <CustomInput
        nameOfInpute="Age"
        keyboardType="numeric"
        onChangeText={setAge}
      />

      <CustomDropList title="Sexe" data={data} onSelect={val => setsexe(val)} />
      <CustomButton
        text="Enregistrer"
        color="lightgreen"
        isLoading={createPatientLoader}
        func={create}
      />
    </View>
  );
};

export default CreatePatient;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.blue,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: fonts.semiBold,
    fontSize: 30,
    color: colors.white,
    textAlign: 'center',
  },
});
