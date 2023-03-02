import {View, Text} from 'react-native';
import React from 'react';
import Login from './src/screens/Login';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <View>
        <Login />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
