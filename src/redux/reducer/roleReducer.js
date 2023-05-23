import React from 'react';
import ActionTypes from '../action/actionType';

const initialState = {
  role: [],
  message: '',
  refresh: '',
};

function roleReducers(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_USER:
      return { state, user: payload, refresh: true };
    default:
      return state;
  }
}

export default roleReducers;
