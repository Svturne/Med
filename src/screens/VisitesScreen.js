import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import VisitesList from '../components/VisitesList';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';
import Dialog from 'react-native-dialog';
import {axiosPrivate} from '../config/axios';
import {showError, showInfo, showSuccess} from '../utils/messages';
import {format} from 'fecha';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';

const Visites = ({route}) => {
  const data = route.params.data;
  console.log(data);
  const iconDimension = 50;
  const dispatch = useDispatch();
  const sexe = useSelector(state => state.PatientReducer.sexe);
  const [visible, setVisible] = useState(false);
  const [visitesDetails, setVisitesDetails] = useState([]);
  const [title, setTitle] = useState('');
  const [remarque, setRemarque] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const showDialog = () => {
    setVisible(true);
  };

  const handleValidate = async () => {
    if (!title || !remarque) {
      return showError('Information manquante');
    }
    setIsLoading(true);
    await axiosPrivate
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
        axiosPrivate
          .get(`/visite/${data._id}`)
          .then(response => {
            setVisitesDetails(response.data);
            setIsLoading(false);
          })

          .catch(err => {
            console.log('erreur in get visite from medecin');
            console.log(err);
            setIsLoading(false);
          });
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    axiosPrivate
      .get(`/visite/${data._id}`)
      .then(response => {
        setVisitesDetails(response.data);

        if (response.data.length == 0) {
          return showInfo('Aucune visite pour cette maladie');
        }

        // dispatch({
        //   type: ActionsName.setPicturesData,
        //   payload: {
        //     picturesData: response.data[0].pictures,
        //   },
        // });
      })
      .catch(err => {
        console.log('erreur in get visite from medecin');
        console.log(err);
      });
  }, []);

  const handleCancel = () => {
    setVisible(false);
  };

  const date = format(new Date(data.createdAt), 'DD-MM-YYYY');

  return (
    <View style={[styles.container, , {backgroundColor: bgColor}]}>
      <View style={styles.head}>
        <Text style={[styles.textTitle, {color: textColor}]}>
          Maladie: {data.maladie}
        </Text>
        <Text style={[styles.textTitle, {color: textColor}]}>
          Date de création: {date}
        </Text>
      </View>
      <Text style={[styles.Subtitle, {color: textColor}]}>Visites: </Text>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {visitesDetails.map(item => {
          return <VisitesList key={item._id} data={item} />;
        })}
      </ScrollView>
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
        onPress={showDialog}>
        <Icon name="plus" type="entypo" size={25} color={colors.black} />
      </TouchableOpacity>

      <Dialog.Container visible={visible}>
        <Dialog.Title>Ajout d'une nouvelle visite</Dialog.Title>
        <Dialog.Input onChangeText={setTitle} label="Titre:" />
        <Dialog.Input onChangeText={setRemarque} label="Remarque:" />

        <View style={{flexDirection: 'row-reverse'}}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Dialog.Button
              label="Valider"
              bold={true}
              onPress={handleValidate}
            />
          )}
          <Dialog.Button label="Annuler" color={'red'} onPress={handleCancel} />
        </View>
      </Dialog.Container>
    </View>
  );
};

export default Visites;

const styles = StyleSheet.create({
  container: {
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
  },
  Subtitle: {
    marginTop: 30,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
});
