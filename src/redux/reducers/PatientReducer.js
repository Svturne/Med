import ActionsName from './ActionsName';

const INITIAL_STATE = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  sex: '',
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
        sex: actions.payload.sex,
      };
    case ActionsName.resetPatientData:
      return {
        ...state,
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        sex: '',
      };
    default:
      return state;
  }
};
