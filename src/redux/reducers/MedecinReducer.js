import ActionsName from './ActionsName';

const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  profilePicture: '',
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case ActionsName.setMedecinData:
      return {
        ...state,
        id: actions.payload.id,
        name: actions.payload.name,
        email: actions.payload.email,
        profilePicture: actions.payload.profilePicture,
      };
    case ActionsName.resetMedecinData:
      return {
        ...state,
        id: '',
        name: '',
        email: '',
        profilePicture: '',
      };
    default:
      return state;
  }
};
