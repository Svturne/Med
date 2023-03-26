import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import VisitesList from '../components/VisitesList';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';
import Dialog from 'react-native-dialog';

const Visites = ({route}) => {
  const data = route.params.data;
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleValidate = () => {
    //TODO: Add new visite in BDD
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const iconDimension = 50;
  const visitesDetails = [
    {
      id: 1,
      title: '1er visite',
      remarque:
        "Dans les textes non linéaires, généralement tabulaires, il est difficile de parler de paragraphes : la page est composée de tables ou de tableaux, de graphes et d'histogrammes, d'images (de photographies, de dessins, ou de schémas, etc.), où les informations textuelles figurent dans des pavés de type légende, commentaire, note, etc., chaque segment de texte étant plus ou moins indépendant des autres, et rattaché à un élément non textuel. Il vaut mieux dans ce cas parler de pavé(s), et envisager la composition du document sous l'angle de la topologie (de la mise en page(s))",
      date: '12/02/2015',
    },
    {
      id: 2,
      title: '2eme visite',
      remarque: 'amelioration',
      date: '22/05/2015',
    },
    {
      id: 3,
      title: '3eme visite',
      remarque: 'amelioration',
      date: '26/12/2015',
    },
    {
      id: 4,
      title: '4eme visite',
      remarque: 'amelioration',
      date: '26/12/2015',
    },
    {
      id: 5,
      title: '5eme visite',
      remarque: 'amelioration',
      date: '22/05/2015',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textTitle}>Maladie: {data.title}</Text>
        <Text style={styles.textTitle}>Date de création: {data.date}</Text>
      </View>
      <Text style={styles.Subtitle}>Visites: </Text>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {visitesDetails.map(item => (
          <VisitesList key={item.id} data={item} />
        ))}
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
        <Dialog.Input label="Titre:" />
        <Dialog.Input label="Remarque:" />
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
