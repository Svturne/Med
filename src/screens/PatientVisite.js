import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import VisitesList from '../components/VisitesList';
import {ScrollView} from 'react-native-gesture-handler';
import {axiosPrivateUser} from '../config/axios';

import {format} from 'fecha';
import PatientVisiteList from '../components/PatientVisiteList';
import {useSelector} from 'react-redux';
import {color} from '@rneui/base';

const PatientVisite = ({route}) => {
  const data = route.params.data;
  const sexe = useSelector(state => state.PatientReducer.sexe);

  const [visitesDetails, setVisitesDetails] = useState([]);

  function useTextColor(sexe) {
    const [textColor, setTextColor] = useState('white');

    useEffect(() => {
      if (sexe === 'Féminin') {
        setTextColor('red');
      } else {
        setTextColor('white');
      }
    }, [sexe]);

    return textColor;
  }

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
  const textColor = useTextColor(sexe);
  const bgColor = useBackGroundColor(sexe);

  useEffect(() => {
    axiosPrivateUser
      .get(`/patient/user/allvisite/${data._id}`)
      .then(response => {
        setVisitesDetails(response.data);
      })
      .catch(err => {
        console.log('erreur in get visite from patient');
        console.log(err);
      });
  }, []);
  const date = format(new Date(data.createdAt), 'DD-MM-YYYY');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}>
      <View style={styles.head}>
        <Text style={[styles.textTitle, {color: textColor}]}>
          Maladie: {data.maladie}
        </Text>
        <Text style={[styles.textTitle, {color: textColor}]}>
          Date de création: {date}
        </Text>
      </View>
      <Text style={[styles.Subtitle, {color: textColor}]}>Visites: </Text>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {visitesDetails.map(item => {
          return <PatientVisiteList key={item._id} data={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default PatientVisite;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 50,
    padding: 20,
  },
  head: {
    padding: 30,
    backgroundColor: colors.whiteAlpha,
    borderRadius: 30,
  },
  textTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  Subtitle: {
    marginTop: 30,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
});
