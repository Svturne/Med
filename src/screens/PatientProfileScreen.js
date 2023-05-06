import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors';
import ActionsName from '../redux/reducers/ActionsName';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '@rneui/themed';
import {axiosRefreshPatient} from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncKeys from '../constant/AsyncKeys';

const ProfileDoctor = () => {
  const iconsize = 25;

  const dispatch = useDispatch();
  const name = useSelector(state => state.PatientReducer.name);
  const sexe = useSelector(state => state.PatientReducer.sexe);

  function useBackGroundColor(sexe) {
    const [bgColor, setBgColor] = useState('bleu');

    useEffect(() => {
      if (sexe === 'Féminin') {
        setBgColor(colors.pink);
      } else {
        setBgColor(colors.blue);
      }
    }, [sexe]);

    return bgColor;
  }

  const bgColor = useBackGroundColor(sexe);

  const disconnect = async () => {
    await axiosRefreshPatient.post('/patient/user/logout');
    dispatch({type: ActionsName.resetPatientData});
    dispatch({type: ActionsName.disconnect});
    AsyncStorage.removeItem(AsyncKeys.accessTokenUser);
    AsyncStorage.removeItem(AsyncKeys.refreshTokenUser);
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Icon
        reverse
        name="user-alt"
        type="font-awesome-5"
        size={35}
        color={colors.whiteAlpha}
      />
      <Text style={styles.username}>{name}</Text>

      <TouchableOpacity style={styles.button} onPress={disconnect}>
        <Icon
          name="logout"
          type="material-community"
          color={colors.black}
          size={iconsize}
        />
        <Text style={[styles.buttonText, {color: colors.red}]}>
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  username: {
    color: colors.white,
    fontSize: 25,
    marginBottom: 50,
    fontFamily: fonts.bold,
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: colors.whiteAlpha,
    borderRadius: 16,
    flexDirection: 'row',
    width: 300,
  },

  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },
});

export default ProfileDoctor;
