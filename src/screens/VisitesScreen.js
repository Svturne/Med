import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import VisitesList from '../components/VisitesList';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';
import Dialog from 'react-native-dialog';
import {axiosPrivate} from '../config/axios';
import {showError, showSuccess} from '../utils/messages';
import {format} from 'fecha';

const Visites = ({route}) => {
  const data = route.params.data;
  const iconDimension = 50;

  const [visible, setVisible] = useState(false);
  const [visitesDetails, setVisitesDetails] = useState([]);
  const [title, setTitle] = useState('');
  const [remarque, setRemarque] = useState('');

  const showDialog = () => {
    setVisible(true);
  };

  const handleValidate = () => {
    if (!title || !remarque) {
      console.log(data);
      return showError('Information manquante');
    }
    axiosPrivate
      .post('/visite', {
        maladieId: data._id,
        remarque: title,
        desc: remarque,
      })
      .then(response => {
        setVisible(false);
        showSuccess('Visite ajoutée avec succès');
        setTitle('');
        setRemarque('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosPrivate
      .get(`/visite/${data._id}`)
      .then(response => {
        setVisitesDetails(response.data);
      })
      .catch(err => {
        console.log('erreur in get visite from medecin');
        console.log(err);
      });
  }, [handleValidate]);

  const handleCancel = () => {
    setVisible(false);
  };

  const date = format(new Date(data.createdAt), 'DD-MM-YYYY');

  //TODO: Change date format
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textTitle}>Maladie: {data.maladie}</Text>
        <Text style={styles.textTitle}>Date de création: {date}</Text>
      </View>
      <Text style={styles.Subtitle}>Visites: </Text>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {visitesDetails.map(item => {
          return <VisitesList key={item._id} data={item} />;
        })}
      </ScrollView>
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
        onPress={showDialog}>
        <Icon name="plus" type="entypo" size={25} color={colors.black} />
      </TouchableOpacity>

      <Dialog.Container visible={visible}>
        <Dialog.Title>Ajout d'une nouvelle visite</Dialog.Title>
        <Dialog.Input onChangeText={setTitle} label="Titre:" />
        <Dialog.Input onChangeText={setRemarque} label="Remarque:" />
        <Dialog.Button label="Annuler" color={'red'} onPress={handleCancel} />
        <Dialog.Button label="Valider" bold={true} onPress={handleValidate} />
      </Dialog.Container>
    </View>
  );
};

export default Visites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    width: '100%',
    height: '100%',
    paddingTop: 50,
    padding: 20,
  },
  head: {
    padding: 30,
    backgroundColor: colors.whiteAlpha,
    borderRadius: 30,
  },
  textTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.black,
  },
  Subtitle: {
    color: colors.white,
    marginTop: 30,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
});
