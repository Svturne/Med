import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/themed';
import colors from '../../assets/colors';
import MaladiesList from '../components/MaladiesList';
import {useSelector} from 'react-redux';
import {axiosPrivateUser} from '../config/axios';

const PatientProfile = () => {
  const name = useSelector(state => state.PatientReducer.name);
  const [maladies, setMaladies] = useState([]);

  useEffect(() => {
    axiosPrivateUser
      .get('/patient/user/allmaladie')
      .then(res => {
        setMaladies(res.data);
        console.log(res.data);
      })

      .catch(err => {
        console.log(err);
      });
  }, []);

  function useBackGroundColor(sexe) {
    const [bgColor, setBgColor] = useState(colors.blue);

    useEffect(() => {
      if (sexe === 'woman') {
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
      if (sexe === 'woman') {
        setTextColor(colors.red);
      } else {
        setTextColor(colors.white);
      }
    }, [sexe]);

    return textColor;
  }

  const bgColor = useBackGroundColor('man'); //TODO: add man or woman
  const textColor = useTextColor('man');
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
        <TouchableOpacity onPress={() => console.log('Picture Pressed')}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg',
            }}
            style={{width: 60, height: 70, borderRadius: 20}}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.doctitle, {color: textColor}]}>
        Vous êtes suivi par le médecin:{' ' + name}
      </Text>
      <View style={styles.listContainer}>
        <Text style={[styles.Subtitle, {color: textColor}]}>
          Voici la liste de vos maladies:{' '}
        </Text>
        <FlatList
          data={maladies}
          renderItem={item => {
            return <MaladiesList data={item.item} />;
          }}
        />
      </View>
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
  doctitle: {
    color: colors.white,
    fontSize: 19,
    paddingVertical: 10,
  },
  Subtitle: {
    color: colors.white,
    marginTop: 30,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
  listContainer: {},
});
