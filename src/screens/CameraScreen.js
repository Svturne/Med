import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import CustomButton from '../components/CustomButton';
import {axiosPrivate} from '../config/axios';
import Dialog from 'react-native-dialog';
import {showError, showSuccess} from '../utils/messages';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors';
import {useDispatch} from 'react-redux';
import ActionsName from '../redux/reducers/ActionsName';

const CameraScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [visibleEdite, setVisibleEdit] = useState(false);
  const [visibleDesc, setVisibleDesc] = useState(false);
  const [desc, setDesc] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const handleEdit = () => {
    setVisibleEdit(false);
    setVisibleDesc(true);
  };

  const handleCancelDesc = () => {
    setVisibleDesc(false);
  };

  const handleEditDesc = () => {
    if (desc === '') {
      showError('Description obligatoire');
    } else {
      const uri = pictureUrl;
      const name = 'test.jpg';
      const type = 'image/jpeg';
      const formData = new FormData();

      formData.append('picture', {
        name,
        uri,
        type,
      });
      formData.append('description', desc);

      axiosPrivate
        .patch('/visite/' + route.params.data._id + '/picture', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(async response => {
          await axiosPrivate
            .get(`/visite/${route.params.data.maladieId}`)
            .then(response => {
              dispatch({
                type: ActionsName.setPicturesData,
                payload: {
                  picturesData: response.data[0].pictures,
                },
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(error => {
          console.log(error);
        });

      setVisibleDesc(false);

      navigation.goBack();

      showSuccess('Votre photo a été enregistrée avec succès');
    }
  };

  const captureHandle = useCallback(async () => {
    try {
      const data = await takePicture();
      setPictureUrl(data.uri);
      setVisibleEdit(true);
    } catch (error) {
      console.log('erreur in takeing picture');
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.Back}
        style={styles.preview}>
        <View style={{width: 150}}>
          <CustomButton
            text="Prendre une photo"
            color={colors.lightgreen}
            func={captureHandle}
          />
        </View>
      </RNCamera>

      <Dialog.Container visible={visibleEdite}>
        <Dialog.Title style={{alignSelf: 'center'}}>
          Valider votre photo
        </Dialog.Title>
        <Image
          source={{
            uri: pictureUrl,
          }}
          style={styles.picture}
        />
        <Dialog.Button
          label="Annuler"
          color={colors.grey}
          onPress={handleCancelEdit}
        />
        <Dialog.Button label="Valider" bold={true} onPress={handleEdit} />
      </Dialog.Container>

      <Dialog.Container visible={visibleDesc}>
        <Dialog.Title style={{alignSelf: 'center'}}>
          Ajouter une description
        </Dialog.Title>
        <Dialog.Input
          placeholder="Description"
          onChangeText={setDesc}></Dialog.Input>
        <Dialog.Button
          label="Annuler"
          color={colors.grey}
          onPress={handleCancelDesc}
        />
        <Dialog.Button label="Valider" bold={true} onPress={handleEditDesc} />
      </Dialog.Container>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 16,
    alignSelf: 'center',
    marginVertical: 15,
  },
});
