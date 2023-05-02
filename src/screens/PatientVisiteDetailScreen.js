import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const PatientVisiteDetailScreen = ({route}) => {
  const data = route.params.data;
  const photos = data.pictures;

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

export default PatientVisiteDetailScreen;
