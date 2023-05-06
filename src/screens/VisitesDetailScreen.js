import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const iconDimension = 50;
const VisitesDetail = ({route}) => {
  const data = route.params.data;
  const photos = useSelector(state => state.VisitPicturesReducer.picturesData);
  const sexe = useSelector(state => state.PatientReducer.sexe);
  const navigation = useNavigation();

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

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, {color: textColor}]}>
            {data.remarque}
          </Text>
          <Text style={[styles.remarque, {color: textColor}]}>{data.desc}</Text>
          {photos &&
            photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{uri: photo.uri}} style={styles.photo} />
                <Text style={[styles.description, , {color: textColor}]}>
                  {photo.description}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.lightgreen,
          borderRadius: iconDimension / 2,
          width: iconDimension,
          height: iconDimension,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: 20,
          bottom: 20,
        }}
        onPress={() => {
          navigation.navigate('CameraScreen', {data: data});
        }}>
        <Icon name="camera" type="foundation" size={25} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 20,
    alignSelf: 'center',
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  photo: {
    width: 170,
    height: 160,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  remarque: {
    padding: 20,
    marginVertical: 20,
    fontFamily: fonts.regular,
    backgroundColor: colors.whiteAlpha,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  description: {
    marginTop: 10,
    fontFamily: fonts.regular,
  },
});

export default VisitesDetail;
