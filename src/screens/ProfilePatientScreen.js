import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import man_avatar from '../../assets/images/man_avatar.png';
import woman_avatar from '../../assets/images/woman_avatar.png';
import MaladiesList from '../components/MaladiesList';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';
import Dialog from 'react-native-dialog';
import {axiosPrivate} from '../config/axios';

const ProfilePatient = ({route}) => {
  const [visible, setVisible] = useState(false);
  const [maladies, setMaladies] = useState([]);
  const [maladieName, setMaladieName] = useState('');

  const showDialog = () => {
    setVisible(true);
  };

  const handleValidate = () => {
    axiosPrivate
      .post('/maladie', {
        patientId: route.params.data._id,
        maladie: maladieName,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    axiosPrivate
      .get(`/patient/allmaladie/${route.params.data._id}`)
      .then(response => {
        setMaladies(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

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

  const iconDimension = 50;
  const data = route.params.data;
  const textColor = useTextColor(data.sexe);
  const bgColor = useBackGroundColor(data.sexe);

  return (
    <View>
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: bgColor,
          },
        ]}>
        <Text style={styles.titleText}>Détails du patient</Text>
        <View>
          <Image
            source={data.sexe == 'Féminin' ? woman_avatar : man_avatar}
            style={styles.image}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Nom:{' '}
            <Text style={[styles.name, {color: textColor}]}> {data.name}</Text>
          </Text>
          <Text style={styles.info}>
            Age:{' '}
            <Text style={[styles.name, {color: textColor}]}>
              {' '}
              {data.age} ans
            </Text>
          </Text>
          <Text style={styles.info}>
            Sexe:{' '}
            <Text style={[styles.name, {color: textColor}]}> {data.sexe}</Text>
          </Text>
          <Text style={styles.info}>
            Email:{' '}
            <Text style={[styles.name, {color: textColor}]}> {data.email}</Text>
          </Text>
        </View>

        <Text style={[styles.Subtitle, {color: textColor}]}>Maladies :</Text>

        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 50}}>
          {maladies.map(item => (
            <MaladiesList key={item._id} data={item} />
          ))}
        </View>
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
        <Dialog.Title>Ajout d'une nouvelle maladie</Dialog.Title>
        <Dialog.Input
          onChangeText={setMaladieName}
          label="Nom de la maladie:"
        />

        <Dialog.Button label="Annuler" color={'red'} onPress={handleCancel} />
        <Dialog.Button label="Valider" bold={true} onPress={handleValidate} />
      </Dialog.Container>
    </View>
  );
};

export default ProfilePatient;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.blue,
    paddingTop: 50,
    padding: 20,
  },
  titleText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 35,
  },
  name: {
    fontSize: 18,
    color: colors.white,
  },
  info: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'grey',
    alignSelf: 'center',
    marginVertical: 60,
  },
  Subtitle: {
    color: colors.white,
    marginTop: 30,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
});
