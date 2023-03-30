import ActionsName from './ActionsName';

const INITIAL_STATE = {
  isSplash: true,
  isLogin: false,
  isConnect: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsName.connecte:
      return {
        ...state,
        isLogin: true,
      };
    case ActionsName.disconnect:
      return {
        ...state,
        isLogin: false,
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
