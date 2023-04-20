import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';
import man_avatar from '../../assets/images/man_avatar.png';
import woman_avatar from '../../assets/images/woman_avatar.png';
import MaladiesList from '../components/MaladiesList';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';
import Dialog from 'react-native-dialog';

const ProfilePatient = ({route}) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleValidate = () => {
    //TODO: Add new maladie in BDD
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  function useTextColor(sexe) {
    const [textColor, setTextColor] = useState('white');

    useEffect(() => {
      if (sexe === 'woman') {
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
      if (sexe === 'woman') {
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

  const maladies = [
    {
      id: 1,
      title: 'Migraine',
      date: '12/02/2015',
    },
    {
      id: 2,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 3,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 4,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 5,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 545,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 21212,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 54545,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 12,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 212512,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 545245,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 165465462,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 216565461212,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 54546526545,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 165465145462,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 2126552412,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 6565246,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 45565,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
    {
      id: 21265525412,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 65655246,
      title: 'Vertige',
      date: '26/12/2015',
    },
    {
      id: 45556,
      title: 'Mal au ventre',
      date: '22/05/2015',
    },
  ];

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
            source={data.sexe == 'woman' ? woman_avatar : man_avatar}
            style={styles.image}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Nom:{' '}
            <Text style={[styles.name, {color: textColor}]}>
              {' '}
              {data.first_name} {data.last_name}
            </Text>
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
            <MaladiesList key={item.id} data={item} />
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
        <Dialog.Input label="Nom de la maladie:" />

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
