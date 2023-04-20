import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import fonts from '../../assets/fonts/fonts';
import Dialog from 'react-native-dialog';
import colors from '../../assets/colors';
import {showInfo} from '../utils/messages';

const PatientsCard = props => {
  const iconeSize = 28;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };
  const handleDelete = () => {
    //TODO: delete patient
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const showPatient = () => {
    navigation.navigate('ProfilePatient', {data: props.data});
  };

  const qrCodeHandled = () => {
    //TODO: Send Qr code
    showInfo('Un nouveau QR code a été envoyé au patient.');
  };

  return (
    <TouchableOpacity
      onPress={showPatient}
      style={[
        styles.card,
        {
          backgroundColor:
            props.data.sexe === 'Masculin'
              ? '#85CDFD'
              : props.data.sexe === 'Féminin'
              ? 'pink'
              : 'white',
        },
      ]}
      key={props.data.id}>
      <View style={{flex: 1}}>
        <Text style={styles.cardTitle}>{props.data.name}</Text>
        <Text style={styles.cardText}>{props.data.email}</Text>
        <Text style={styles.cardText}>{props.data.age} ans</Text>
        <Text style={styles.cardText}>{props.data.sexe}</Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity>
          <Icon
            name="edit"
            type="feather"
            color={colors.yellow}
            size={iconeSize}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={showDialog}>
          <Icon
            name="page-delete"
            type="foundation"
            color={colors.red}
            size={iconeSize}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={qrCodeHandled}>
          <Icon
            name="qrcode-scan"
            type="material-community"
            color={colors.black}
            size={iconeSize}
          />
        </TouchableOpacity>
        <Dialog.Container visible={visible}>
          <Dialog.Title>
            Êtes-vous sûr de vouloir supprimer le patient ?
          </Dialog.Title>

          <Dialog.Button
            label="Annuler"
            color={colors.grey}
            onPress={handleCancel}
          />
          <Dialog.Button
            label="Supprimer"
            bold={true}
            color={colors.red}
            onPress={handleDelete}
          />
        </Dialog.Container>
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
    fontFamily: fonts.regular,
    color: colors.black,
    marginBottom: 5,
  },
  icon: {
    width: 45,

    justifyContent: 'space-between',
  },
});
