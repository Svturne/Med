import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import colors from '../../assets/colors';
import CustomButton from '../components/CustomButton';

const CameraScreen = () => {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
    } catch (error) {
      console.log(error);
    }
  };
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
            func={() => captureHandle()}
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
