import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import {Icon, SearchBar} from '@rneui/themed';
import PatientsCard from '../components/PatientsCard';
import fonts from '../../assets/fonts/fonts';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const iconDimension = 50;

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
          marginTop: 20,
          marginLeft: 25,
        }}>
        Liste des patients:
      </Text>
      <SearchBar
        placeholder="John Doe"
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarContainerInput}
        inputStyle={styles.searchBarInput}
      />
      <FlatList
        data={patients.filter(patients => patients.first_name.includes(search))}
        renderItem={item => {
          return <PatientsCard data={item.item} />;
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: colors.green,
          borderRadius: iconDimension / 2,
          width: iconDimension,
          height: iconDimension,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          alignSelf: 'center',

          bottom: 10,
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
  searchBarContainer: {
    backgroundColor: colors.blue,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarContainerInput: {
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  searchBarInput: {
    color: colors.black,
    fontFamily: fonts.semiBold,
  },
});
