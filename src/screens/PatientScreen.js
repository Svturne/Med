import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import AsyncKeys from '../constant/AsyncKeys';
import ActionsName from '../redux/reducers/ActionsName';

const PatientScreen = ({route}) => {
  const token = route.params.token;
  const isLogin = useSelector(state => state.AuthReducer.isLogin);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  const bodyParameters = {
    key: 'value',
  };

  useEffect(() => {
    axios
      .post(
        'http://10.0.2.2:3000/api/patient/user/refresh',
        bodyParameters,
        config,
      )
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
          type: ActionsName.setPatientData,
          payload: {
            id: response.data.user.patient._id,
            name: response.data.user.patient.name,
            age: response.data.user.patient.age,
            sexe: response.data.user.patient.sexe,
          },
        });

        dispatch({
          type: ActionsName.connectePatient,
        });
        setTimeout(() => {
          navigation.navigate('ProfilePatientScreen');
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'application Med</Text>
      <ActivityIndicator size={60} color={colors.white} />
      <TouchableOpacity
        onPress={() => {
          console.log(isLogin);
        }}>
        <Text>LOGIIIN</Text>
      </TouchableOpacity>
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
