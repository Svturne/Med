import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import VisitesList from '../components/VisitesList';
import {ScrollView} from 'react-native-gesture-handler';
import {axiosPrivateUser} from '../config/axios';

import {format} from 'fecha';

const PatientVisite = ({route}) => {
  const data = route.params.data;

  const [visitesDetails, setVisitesDetails] = useState([]);
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
  console.log(visitesDetails);
  const date = format(new Date(data.createdAt), 'DD-MM-YYYY');

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textTitle}>Maladie: {data.maladie}</Text>
        <Text style={styles.textTitle}>Date de création: {date}</Text>
      </View>
      <Text style={styles.Subtitle}>Visites: </Text>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {visitesDetails.map(item => {
          return <VisitesList key={item._id} data={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default PatientVisite;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
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
    color: colors.black,
  },
  Subtitle: {
    color: colors.white,
    marginTop: 30,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
});
