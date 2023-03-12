import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import CustomInput from '../components/CustomInput';

const CreatePatient = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Ajouter un nouveau patient</Text>
      <CustomInput nameOfInpute="Nom" />
      <CustomInput nameOfInpute="Email" />
      <CustomInput nameOfInpute="Age" />
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
  },
  titleText: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
  },
});
