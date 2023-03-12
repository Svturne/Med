import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import man_avatar from '../../assets/images/man_avatar.png';
import MaladiesList from '../components/MaladiesList';

const ProfilePatient = ({route}) => {
  const windowWidth = Dimensions.get('window').width;
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
      id: 545,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 21212,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 54545,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 12,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 21212,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 54545,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 165465462,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 21656546212,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 5454656545,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 165465462,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 212655412,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 65646,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 456,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
  ];
  const data = route.params.data;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            data.sexe === 'man'
              ? colors.blue
              : data.sexe === 'woman'
              ? 'pink'
              : 'white',
        },
      ]}>
      <Text style={styles.titleText}>Détails du patient</Text>
      <View>
        <Image source={man_avatar} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>
          Nom:{' '}
          <Text
            style={[
              styles.name,
              {color: data.sexe === 'woman' ? 'red' : 'white'},
            ]}>
            {' '}
            {data.first_name} {data.last_name}
          </Text>
        </Text>
        <Text style={styles.info}>
          Age:{' '}
          <Text
            style={[
              styles.name,
              {color: data.sexe === 'woman' ? 'red' : 'white'},
            ]}>
            {' '}
            {data.age} ans
          </Text>
        </Text>
        <Text style={styles.info}>
          Sexe:{' '}
          <Text
            style={[
              styles.name,
              {color: data.sexe === 'woman' ? 'red' : 'white'},
            ]}>
            {' '}
            {data.sexe}
          </Text>
        </Text>
        <Text style={styles.info}>
          Email:{' '}
          <Text
            style={[
              styles.name,
              {color: data.sexe === 'woman' ? 'red' : 'white'},
            ]}>
            {' '}
            {data.email}
          </Text>
        </Text>
      </View>

      <Text
        style={[
          styles.Subtitle,
          {color: data.sexe === 'woman' ? 'red' : 'white'},
        ]}>
        Symptômes :
      </Text>
      <FlatList
        data={maladies}
        contentContainerStyle={{alignItems: 'center'}}
        numColumns={parseInt(windowWidth / 170)}
        renderItem={item => {
          return <MaladiesList data={item.item} />;
        }}
      />
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
