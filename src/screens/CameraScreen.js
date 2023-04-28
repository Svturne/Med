import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import CustomButton from '../components/CustomButton';
import {axiosPrivate} from '../config/axios';

const CameraScreen = ({route}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const captureHandle = useCallback(async () => {
    try {
      const data = await takePicture();
      const uri = data.uri;
      const name = 'test.jpg';
      const type = 'image/jpeg';
      const formData = new FormData();

      formData.append('picture', {
        name,
        uri,
        type,
      });
      formData.append('description', 'oui non');
      axiosPrivate
        .patch('/visite/' + route.params.data._id + '/picture', formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            description: 'test',
          },
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      console.log(JSON.stringify(formData));
    } catch (error) {
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
            color="lightgreen"
            func={captureHandle}
          />
        </View>
      </RNCamera>
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
});
