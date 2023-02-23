import ActionsName from './ActionsName';

const INITIAL_STATE = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case ActionsName.setMedecinData:
      return {
        ...state,
        id: actions.payload.id,
        firstName: actions.payload.firstName,
        lastName: actions.payload.lastName,
        email: actions.payload.email,
      };
    case ActionsName.resetMedecinData:
      return {
        ...state,
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
      };
    default:
      return state;
  }
};
