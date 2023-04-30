import ActionsName from './ActionsName';

const INITIAL_STATE = {
  patientsList: [],
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case ActionsName.setPatientsListData:
      return {
        ...state,
        patientsList: actions.payload.patientsList,
      };
    case ActionsName.resetPatientsListData:
      return {
        ...state,
        patientsList: [],
      };
    default:
      return state;
  }
};
