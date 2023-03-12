import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import man_avatar from '../../assets/images/man_avatar.png';
import MaladiesList from '../components/MaladiesList';

const ProfilePatient = ({route}) => {
  const maladies = [
    {
      id: 1,
      title: 'Migraine',
      date: '12/02/2015',
    },
    {
      id: 2,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 3,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 4,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 5,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 6,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 7,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 8,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
  ];
  const data = route.params.data;
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Détails du patient</Text>
      <View>
        <Image source={man_avatar} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>
          Nom:{' '}
          <Text style={styles.name}>
            {' '}
            {data.first_name} {data.last_name}
          </Text>
        </Text>
        <Text style={styles.info}>
          Age: <Text style={styles.name}> {data.age} ans</Text>
        </Text>
        <Text style={styles.info}>
          Sexe: <Text style={styles.name}> {data.sexe}</Text>
        </Text>
        <Text style={styles.info}>
          Email: <Text style={styles.name}> {data.email}</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.Subtitle}>Symptômes :</Text>
        <FlatList
          data={maladies}
          numColumns={2}
          renderItem={item => {
            return <MaladiesList data={item.item} />;
          }}
        />
      </View>
    </View>
  );
};

export default ProfilePatient;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.blue,
    paddingTop: 50,
    padding: 20,
  },
  titleText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 35,
  },
  name: {
    fontSize: 18,
    color: colors.white,
  },
  info: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'grey',
    alignSelf: 'center',
    marginVertical: 60,
  },
  Subtitle: {
    color: colors.white,
    marginTop: 30,
    fontFamily: fonts.bold,
    fontSize: 22,
    textDecorationLine: 'underline',
  },
});
