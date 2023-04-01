import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/themed';
import colors from '../../assets/colors';
import MaladiesList from '../components/MaladiesList';

const PatientScreen = ({route}) => {
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
  ];

  function useBackGroundColor(sexe) {
    const [bgColor, setBgColor] = useState('bleu');

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
    const [textColor, setTextColor] = useState('white');

    useEffect(() => {
      if (sexe === 'woman') {
        setTextColor('red');
      } else {
        setTextColor('white');
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
          Bonjour, Rafik
        </Text>
        <TouchableOpacity onPress={console.log('Picture Pressed')}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg',
            }}
            style={{width: 60, height: 70, borderRadius: 20}}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.doctitle, {color: textColor}]}>
        Vous êtes suivi par le médecin:{' '}
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

export default PatientScreen;

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
  listContainer: {
    marginTop: 'auto',
  },
});
