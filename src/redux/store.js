import {createStore, combineReducers} from 'redux';
import MedecinReducer from './reducers/MedecinReducer';
import PatientReducer from './reducers/PatientReducer';
import MaladieReducer from './reducers/MaladieReducer';
const RootReducers = combineReducers({
  MedecinReducer,
  PatientReducer,
  MaladieReducer,
});

export const store = createStore(RootReducers);
