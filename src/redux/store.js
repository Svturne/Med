import {createStore, combineReducers} from 'redux';
import MedecinReducer from './reducers/MedecinReducer';
import PatientReducer from './reducers/PatientReducer';
import MaladieReducer from './reducers/MaladieReducer';
import AuthReducer from './reducers/AuthReducer';
const RootReducers = combineReducers({
  MedecinReducer,
  PatientReducer,
  MaladieReducer,
  AuthReducer,
});

export const store = createStore(RootReducers);
