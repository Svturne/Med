import ActionsName from './ActionsName';

const INITIAL_STATE = {
  isSplash: true,
  isLogin: 0,
  isConnect: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsName.connecteMed:
      return {
        ...state,
        isLogin: 1,
      };
    case ActionsName.connectePatient:
      return {
        ...state,
        isLogin: 2,
      };
    case ActionsName.disconnect:
      return {
        ...state,
        isLogin: 0,
      };

    case ActionsName.finishSplash:
      return {
        ...state,
        isSplash: false,
      };

    case ActionsName.changeStatus:
      return {
        ...state,
        isConnect: action.payload,
      };

    default:
      return state;
  }
};
