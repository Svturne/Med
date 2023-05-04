import ActionsName from './ActionsName';

const INITIAL_STATE = {
  picturesData: [],
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case ActionsName.setPicturesData:
      return {
        ...state,
        picturesData: actions.payload.picturesData,
      };
    case ActionsName.addPicturesData:
      return {
        ...state,
        picturesData: [...state.picturesData, actions.payload.newMaladie],
      };
    case ActionsName.resetPicturesData:
      return {
        picturesData: [],
      };
    default:
      return state;
  }
};
