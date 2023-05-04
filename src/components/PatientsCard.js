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
import {SelectList} from 'react-native-dropdown-select-list';
import {useDispatch} from 'react-redux';

const PatientsCard = props => {
  const iconeSize = 28;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleEdite, setVisibleEdit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [sexe, setSexe] = useState('');
  const data = [
    {key: '1', value: 'Masculin'},
    {key: '2', value: 'Féminin'},
  ];
  const showDialog = () => {
    setVisible(true);
  };

  const showEdit = () => {
    setVisibleEdit(true);
  };

  const handleDelete = () => {
    axiosPrivate
      .delete(`patient/${props.data._id}`)
      .then(response => {
        axiosPrivate.get('/patient/').then(response => {
          dispatch({
            type: ActionsName.setPatientsListData,
            payload: {
              patientsList: response.data,
            },
          });
        });
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
        email: email ? email : props.data.email,
        age: age ? age : props.data.age,
        sexe: sexe ? sexe : props.data.sexe,
      })
      .then(response => {
        axiosPrivate.get('/patient/').then(response => {
          dispatch({
            type: ActionsName.setPatientsListData,
            payload: {
              patientsList: response.data,
            },
          });
        });

        setVisibleEdit(false);
        setTimeout(() => {
          showSuccess('Patient mise à jour');
        }, 500);
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
        id: props.data._id,
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
              ? colors.cardbleu
              : props.data.sexe === 'Féminin'
              ? colors.pink
              : colors.white,
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
            <TextInput
              style={styles.edit}
              onChangeText={setEmail}
              keyboardType={'email-address'}>
              {props.data.email}
            </TextInput>
            <TextInput
              style={styles.edit}
              onChangeText={setAge}
              keyboardType={'number-pad'}>
              {props.data.age}
            </TextInput>
            <SelectList
              title="Sexe"
              save="value"
              data={data}
              placeholder={props.data.sexe}
              search={false}
              boxStyles={styles.boxStyles}
              setSelected={val => setSexe(val)}
              fontFamily={fonts.semiBold}
              inputStyles={{color: colors.white}}
              maxHeight={100}
            />

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
  boxStyles: {
    backgroundColor: colors.lightblue,
    borderRadius: 16,
    borderColor: colors.white,
    paddingLeft: 16,
    marginVertical: 5,
  },
});
