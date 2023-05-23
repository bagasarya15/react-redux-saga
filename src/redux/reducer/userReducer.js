// import ActionTypes from '../action/ActionTypes';

import ActionTypes from "../action/actionType";

const initialState = {
  user: [],
  message: '',
  status: 0,
  refresh: '',
};

function userReducers(state = initialState, action) {
  const { type, payload } = action;
  // console.log('test',payload);

  switch (type) {
    case ActionTypes.GET_USERS_RESPONSE:
      return {
        state,
        user: payload.result,
        status: payload.status,
        // message: payload.message,
        refresh: true,
      };
    case ActionTypes.ADD_USER_RESPONSE:
      return { state, message: payload.message, status: payload.status, refresh: false };
    case ActionTypes.UPDATE_USER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.DEL_USER_RESPONSE:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default userReducers;