import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CustomButton from '../components/CustomButton';
import fonts from '../../assets/fonts/fonts';
import {useNavigation} from '@react-navigation/native';
import {showError, showInfo} from '../utils/messages';

import {axiosInstance} from '../config/axios';

const CodePassword = ({route}) => {
  const navigation = useNavigation();
  const [selectFocus, setSelectFocus] = useState(0);
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [thirdInput, setThirdInput] = useState('');
  const [fourthInput, setFourthInput] = useState('');
  const [sendEmailCodeLoader, setSendEmailCodeLoader] = useState(false);

  const textInputRef2 = useRef(null);
  const textInputRef3 = useRef(null);
  const textInputRef4 = useRef(null);

  const email = route.params.email;

  const sendCode = useCallback(() => {
    if (
      firstInput === '' ||
      secondInput === '' ||
      thirdInput === '' ||
      fourthInput === ''
    ) {
      showError('Remplissez tous les champs requis');
    } else {
      const code = firstInput + secondInput + thirdInput + fourthInput;
      console.log(code);

      setSendEmailCodeLoader(true);
      axiosInstance
        .post('/medecin/verifycode', {
          email,
          code,
        })
        .then(response => {
          console.log(response.data);
          navigation.navigate('RestPassword', {
            email,
            code,
          });
        })
        .catch(error => {
          showError("Ce n'est pas le bon code");
          console.log(error.response.data);
        })
        .finally(() => {
          setSendEmailCodeLoader(false);
        });
    }
  }, [firstInput, secondInput, thirdInput, fourthInput]);

  const resendEmail = () => {
    axiosInstance
      .post('/medecin/sendcode', {
        email,
      })
      .then(response => {
        console.log(response.data);
        showInfo("Un nouveau Email vient d'être envoyé.");
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrer le code de sécuriter</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[
            styles.input,
            {borderColor: selectFocus === 1 ? 'green' : 'white'},
          ]}
          onFocus={() => {
            setSelectFocus(1);
          }}
          onBlur={() => {
            setSelectFocus(0);
          }}
          onChangeText={text => {
            setFirstInput(text);
            if (text === '') {
            } else {
              textInputRef2.current.focus();
            }
          }}
          maxLength={1}
          keyboardType="numeric"
        />
        <TextInput
          style={[
            styles.input,
            {borderColor: selectFocus === 2 ? 'green' : 'white'},
          ]}
          onFocus={() => {
            setSelectFocus(2);
          }}
          onBlur={() => {
            setSelectFocus(0);
          }}
          ref={textInputRef2}
          onChangeText={text => {
            setSecondInput(text);
            if (text === '') {
            } else {
              textInputRef3.current.focus();
            }
          }}
          maxLength={1}
          keyboardType="numeric"
        />
        <TextInput
          style={[
            styles.input,
            {borderColor: selectFocus === 3 ? 'green' : 'white'},
          ]}
          onFocus={() => {
            setSelectFocus(3);
          }}
          onBlur={() => {
            setSelectFocus(0);
          }}
          ref={textInputRef3}
          onChangeText={text => {
            setThirdInput(text);
            if (text === '') {
            } else {
              textInputRef4.current.focus();
            }
          }}
          maxLength={1}
          keyboardType="numeric"
        />
        <TextInput
          style={[
            styles.input,
            {borderColor: selectFocus === 4 ? 'green' : 'white'},
          ]}
          onFocus={() => {
            setSelectFocus(4);
          }}
          onBlur={() => {
            setSelectFocus(0);
          }}
          ref={textInputRef4}
          onChangeText={text => {
            setFourthInput(text);
          }}
          maxLength={1}
          keyboardType="numeric"
        />
      </View>

      <CustomButton
        text="Valider"
        color="lightgreen"
        isLoading={sendEmailCodeLoader}
        func={sendCode}
      />
      <TouchableOpacity onPress={resendEmail}>
        <Text style={styles.desc}>Renvoyer le code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CodePassword;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.blue,
    paddingTop: 50,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 60,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    backgroundColor: colors.white,
    padding: 10,
    width: 45,
    height: 60,
    textAlign: 'center',
    fontSize: 30,
    borderRadius: 16,
    borderWidth: 3,
  },
  desc: {
    fontFamily: fonts.regular,
    textAlign: 'right',
    fontSize: 15,
    color: colors.white,
  },
});
