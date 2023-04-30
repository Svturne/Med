import {createStore, combineReducers} from 'redux';
import MedecinReducer from './reducers/MedecinReducer';
import PatientReducer from './reducers/PatientReducer';
import MaladieReducer from './reducers/MaladieReducer';
import AuthReducer from './reducers/AuthReducer';
import PatientListReducer from './reducers/PatientListReducer';
const RootReducers = combineReducers({
  MedecinReducer,
  PatientReducer,
  MaladieReducer,
  AuthReducer,
  PatientListReducer,
});

export const store = createStore(RootReducers);
