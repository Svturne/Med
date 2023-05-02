import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import AsyncKeys from '../constant/AsyncKeys';
import ActionsName from '../redux/reducers/ActionsName';
import {axiosRefreshPatient} from '../config/axios';

const PatientScreen = ({route}) => {
  const token = route.params.token;
  const isLogin = useSelector(state => state.AuthReducer.isLogin);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    axiosRefreshPatient
      .post('/patient/user/refresh', token)
      .then(response => {
        AsyncStorage.removeItem(AsyncKeys.accessToken);
        AsyncStorage.removeItem(AsyncKeys.refreshToken);

        AsyncStorage.setItem(
          AsyncKeys.accessTokenUser,
          response.data.accessToken,
        );

        AsyncStorage.setItem(
          AsyncKeys.refreshTokenUser,
          response.data.refreshToken,
        );

        dispatch({
          type: ActionsName.connectePatient,
        });

        dispatch({
          type: ActionsName.setPatientData,

          payload: {
            id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            age: response.data.user.age,
            sexe: response.data.user.sexe,
          },
        });

        setTimeout(() => {
          navigation.navigate('PatientProfile');
        }, 1000);
      })
      .catch(err => {
        console.log('erreur in login patient');
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'application Med</Text>
      <ActivityIndicator size={60} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blue,
    alignItems: 'center',
    padding: 16,
  },

  title: {
    marginBottom: 55,
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.white,
  },
});

export default PatientScreen;
