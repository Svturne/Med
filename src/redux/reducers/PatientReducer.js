import ActionsName from './ActionsName';

const INITIAL_STATE = {
  id: 0,
  name: '',
  email: '',
  age: 0,
  sexe: '',
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case ActionsName.setPatientData:
      return {
        ...state,
        id: actions.payload.id,
        name: actions.payload.name,
        email: actions.payload.email,
        age: actions.payload.age,
        sexe: actions.payload.sexe,
      };
    case ActionsName.resetPatientData:
      return {
        ...state,
        id: 0,
        name: '',
        email: '',
        age: 0,
        sexe: '',
      };
    default:
      return state;
  }
};
