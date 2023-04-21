import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import fonts from '../../assets/fonts/fonts';
import Dialog from 'react-native-dialog';
import colors from '../../assets/colors';
import {showInfo, showSuccess} from '../utils/messages';
import {axiosPrivate} from '../config/axios';
import {TextInput} from 'react-native-gesture-handler';
import {color} from '@rneui/base';

const PatientsCard = props => {
  const iconeSize = 28;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [visibleEdite, setVisibleEdit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [sexe, setSexe] = useState('');

  const showDialog = () => {
    setVisible(true);
  };

  const showEdit = () => {
    setVisibleEdit(true);
  };

  const handleDelete = () => {
    console.log();
    axiosPrivate
      .delete(`patient/${props.data._id}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const handleEdit = () => {
    axiosPrivate
      .put(`/patient/${props.data._id}`, {
        name: name ? name : props.data.name,
        email: email,
        age: age,
        sexe: sexe,
      })
      .then(response => {
        console.log(response.data);
        showSuccess('Patient mise à jour');
        setVisibleEdit(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const showPatient = () => {
    navigation.navigate('ProfilePatient', {data: props.data});
  };

  const qrCodeHandled = () => {
    axiosPrivate
      .post(`/patient/resendqr/${props.data._id}`, {
        name: props.data.name,
        email: props.data.email,
        age: props.data.age,
        sexe: props.data.sexe,
      })
      .then(response => {
        console.log(response.data);
        showInfo('Un nouveau QR code a été envoyé au patient.');
      })
      .catch(error => {
        console.log(error);
      });
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
        <TouchableOpacity onPress={showEdit}>
          <Icon
            name="edit"
            type="feather"
            color={colors.yellow}
            size={iconeSize}
          />
          <Dialog.Container visible={visibleEdite}>
            <Dialog.Title>Modification du patient</Dialog.Title>
            <TextInput style={styles.edit} onChangeText={setName}>
              {props.data.name}
            </TextInput>
            <TextInput style={styles.edit} onChangeText={setEmail}>
              {props.data.email}
            </TextInput>
            <TextInput style={styles.edit} onChangeText={setAge}>
              {props.data.age}
            </TextInput>
            <TextInput style={styles.edit} onChangeText={setSexe}>
              {props.data.sexe}
            </TextInput>
            <Dialog.Button
              label="Annuler"
              color={colors.grey}
              onPress={handleCancelEdit}
            />
            <Dialog.Button
              label="Valider"
              bold={true}
              color={colors.blue}
              onPress={handleEdit}
            />
          </Dialog.Container>
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
  edit: {
    backgroundColor: colors.lightblue,
    color: colors.white,
    fontFamily: fonts.bold,
    borderRadius: 16,
    paddingLeft: 16,
    marginVertical: 5,
  },
});
