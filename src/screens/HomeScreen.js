import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import {Icon, SearchBar} from '@rneui/themed';
import PatientsCard from '../components/PatientsCard';
import fonts from '../../assets/fonts/fonts';
import {axiosPrivate} from '../config/axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState([]);

  const iconDimension = 50;

  const handleIMGPress = () => {
    navigation.navigate('ProfileDoctor');
  };

  const handlePLUSPress = () => {
    navigation.navigate('CreatePatient');
  };

  useEffect(() => {
    axiosPrivate
      .get('/patient/643df4de712b093516b2829e')
      .then(response => {
        setPatients(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 25}}>
        <Text
          style={{
            color: colors.white,
            fontFamily: fonts.bold,
            fontSize: 30,
            flex: 6,
          }}>
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
          color: colors.white,
          fontFamily: fonts.semiBold,
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
        contentContainerStyle={{paddingBottom: 60}}
        data={patients.filter(patients => patients.name.includes(search))}
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
          bottom: 10,
          right: 30,
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
