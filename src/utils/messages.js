import Snackbar from 'react-native-snackbar';
import colors from '../../assets/colors';

function showSuccess(message) {
  Snackbar.show({
    text: message,
    textColor: colors.black,
    backgroundColor: colors.green,
    duration: Snackbar.LENGTH_SHORT,
  });
}

function showError(message) {
  Snackbar.show({
    text: message,
    backgroundColor: colors.red,
    duration: Snackbar.LENGTH_SHORT,
  });
}

function showInfo(message) {
  Snackbar.show({
    text: message,
    backgroundColor: colors.lightblue,
    duration: Snackbar.LENGTH_SHORT,
  });
}

export {showError, showSuccess, showInfo};
