import ActionsName from './ActionsName';

const INITIAL_STATE = {
  maladieData: [],
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case ActionsName.setMaladieData:
      return {
        ...state,
        maladieData: actions.payload.maladieData,
      };
    case ActionsName.addMaladieData:
      return {
        ...state,
        maladieData: [...state.maladieData, actions.payload.newMaladie],
      };
    case ActionsName.resetMaladieData:
      return {
        maladieData: [],
      };
    default:
      return state;
  }
};
