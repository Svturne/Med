import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import {
  NavigationContainer,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native';
import {Icon} from '@rneui/themed';

const HomeScreen = () => {
  const navigation = useNavigation();

  const iconDimension = 60;

  const handleIMGPress = () => {
    navigation.navigate('ProfileDoctor');
  };

  const handlePLUSPress = () => {
    navigation.navigate('CreatePatient');
  };
  const patients = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'jhon@gmail.com',
      age: 12,
      sexe: 'man',
    },
    {
      id: 2,
      first_name: 'Samira',
      last_name: 'Abdelkader',
      email: 'samira@gmail.com',
      age: 23,
      sexe: 'woman',
    },
    {
      id: 3,
      first_name: 'Riad',
      last_name: 'Benkesra',
      email: 'riad@gmail.com',
      age: 32,
      sexe: 'man',
    },
    {
      id: 4,
      first_name: 'Karima',
      last_name: 'Ghali',
      email: 'Samira@gmail.com',
      age: 45,
      sexe: 'woman',
    },
    {
      id: 6,
      first_name: 'Rafik',
      last_name: 'Zali',
      email: 'rafik@gmail.com',
      age: 19,
      sexe: 'man',
    },
  ];

  const renderItem = ({item}) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            item.sexe === 'man'
              ? '#85CDFD'
              : item.sexe === 'woman'
              ? 'pink'
              : 'white',
        },
      ]}
      key={item.id}>
      <Text style={styles.cardTitle}>
        {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.cardText}>{item.email}</Text>
      <Text style={styles.cardText}>{item.age} ans</Text>
      <Text style={styles.cardText}>{item.sexe}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 25}}>
        <Text style={{color: 'white', fontSize: 30, flex: 6}}>
          Bonjour, Mehdi
        </Text>
        <TouchableOpacity onPress={handleIMGPress}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg',
            }}
            style={{width: 60, height: 70, borderRadius: 20}}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: 'white',
          fontSize: 20,
          textDecorationLine: 'underline',
          marginTop: 20,
          marginLeft: 25,
        }}>
        Liste des patients:
      </Text>

      <FlatList data={patients} renderItem={renderItem} />
      <TouchableOpacity
        style={{
          backgroundColor: colors.green,
          borderRadius: iconDimension / 2,
          width: iconDimension,
          height: iconDimension,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: 20,
          bottom: 20,
        }}
        onPress={handlePLUSPress}>
        <Icon name="plus" type="entypo" size={25} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    width: '100%',
    height: '100%',
  },
  card: {
    padding: 20,
    marginHorizontal: 25,
    marginVertical: 10,
    borderRadius: 10,
  },
  cardTitle: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
