import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const photos = [
  {
    uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg',
    description: 'Description de la photo 1',
  },
  {
    uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg',
    description: 'Description de la photo 2',
  },
  {
    uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg',
    description: 'Description de la photo 3',
  },
];

const VisitesDetail = ({route}) => {
  const data = route.params.data;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {photos.map((photo, index) => (
        <View key={index} style={styles.photoContainer}>
          <Image source={{uri: photo.uri}} style={styles.photo} />
          <Text style={styles.description}>{photo.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 20,
  },
  photoContainer: {
    marginBottom: 20,
  },
  photo: {
    width: 170,
    height: 160,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  description: {
    marginTop: 10,
    color: colors.white,
    fontFamily: fonts.regular,
  },
});

export default VisitesDetail;
