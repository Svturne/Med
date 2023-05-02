import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/themed';
import colors from '../../assets/colors';
import PatientMaladiesList from '../components/PatientMaladiesList';
import {useDispatch, useSelector} from 'react-redux';
import {axiosPrivateUser} from '../config/axios';
import {ScrollView} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import {showError} from '../utils/messages';

const PatientProfile = () => {
  const navigation = useNavigation();

  const name = useSelector(state => state.PatientReducer.name);
  const sexe = useSelector(state => state.PatientReducer.sexe);
  const [maladies, setMaladies] = useState([]);

  const pressedProfile = () => {
    navigation.navigate('PatientProfileScreen');
  };

  useEffect(() => {
    axiosPrivateUser
      .get('/patient/user/allmaladie')
      .then(res => {
        if (!res.data) {
          showError('Ce patient ne possede pas de maladies');
          setMaladies([]);
        } else {
          setMaladies(res.data);
        }
      })

      .catch(err => {
        console.log('erreur in getting maladie patient side');
        console.log(err);
      });
  }, []);

  const bgColor = useBackGroundColor(sexe);
  const textColor = useTextColor(sexe);

  function useBackGroundColor(sexe) {
    const [bgColor, setBgColor] = useState(colors.blue);

    useEffect(() => {
      if (sexe === 'Féminin') {
        setBgColor(colors.pink);
      } else {
        setBgColor(colors.blue);
      }
    }, [sexe]);

    return bgColor;
  }

  function useTextColor(sexe) {
    const [textColor, setTextColor] = useState(colors.white);

    useEffect(() => {
      if (sexe === 'Féminin') {
        setTextColor(colors.red);
      } else {
        setTextColor(colors.white);
      }
    }, [sexe]);

    return textColor;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 25}}>
        <Text style={{color: textColor, fontSize: 30, flex: 6}}>
          Bonjour, {name}
        </Text>
        <TouchableOpacity onPress={pressedProfile}>
          <Icon
            reverse
            name="user-alt"
            type="font-awesome-5"
            size={35}
            color={colors.whiteAlpha}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.Subtitle, {color: textColor}]}>
        Voici la liste de vos maladies:{' '}
      </Text>
      {}
      <ScrollView style={styles.listContainer}>
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 50}}>
          {maladies.map(item => (
            <PatientMaladiesList key={item._id} data={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PatientProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    width: '100%',
    height: '100%',
    padding: 16,
  },

  Subtitle: {
    color: colors.white,
    marginTop: 30,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
});
