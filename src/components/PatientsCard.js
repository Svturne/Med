import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';

const PatientsCard = props => {
  const iconeSize = 28;
  const navigation = useNavigation();
  const showPatient = () => {
    navigation.navigate('ProfilePatient', {data: props.data});
  };

  return (
    <TouchableOpacity
      onPress={showPatient}
      style={[
        styles.card,
        {
          backgroundColor:
            props.data.sexe === 'man'
              ? '#85CDFD'
              : props.data.sexe === 'woman'
              ? 'pink'
              : 'white',
        },
      ]}
      key={props.data.id}>
      <View style={{flex: 1}}>
        <Text style={styles.cardTitle}>
          {props.data.first_name} {props.data.last_name}
        </Text>
        <Text style={styles.cardText}>{props.data.email}</Text>
        <Text style={styles.cardText}>{props.data.age} ans</Text>
        <Text style={styles.cardText}>{props.data.sexe}</Text>
      </View>
      <View style={styles.icon}>
        <Icon
          name="edit"
          type="feather"
          color={colors.yellow}
          size={iconeSize}
        />
        <Icon
          name="page-delete"
          type="foundation"
          color={colors.red}
          size={iconeSize}
        />
        <Icon
          name="qrcode-scan"
          type="material-community"
          color={colors.black}
          size={iconeSize}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PatientsCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginHorizontal: 25,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
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
  icon: {
    width: 45,

    justifyContent: 'space-between',
  },
});
