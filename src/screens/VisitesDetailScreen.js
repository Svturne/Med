import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
const iconDimension = 50;
const VisitesDetail = ({route}) => {
  const data = route.params.data;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{data.remarque}</Text>
          <Text style={styles.remarque}>{data.desc}</Text>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{uri: photo.uri}} style={styles.photo} />
              <Text style={styles.description}>{photo.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
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
        onPress={() => {
          navigation.navigate('CameraScreen');
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
    backgroundColor: colors.blue,
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 20,
    color: colors.black,
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
    color: colors.white,
    padding: 20,
    marginVertical: 20,
    fontFamily: fonts.regular,
    backgroundColor: colors.whiteAlpha,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  description: {
    marginTop: 10,
    color: colors.white,
    fontFamily: fonts.regular,
  },
});

export default VisitesDetail;
