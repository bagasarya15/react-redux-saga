import React from 'react';
import ActionTypes from '../action/actionType';

const initialState = {
  category: [],
  message: '',
  refresh: '',
};

function categoryReducers(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_CATEGORY:
      return { state, category: payload, refresh: true };
    default:
      return state;
  }
}

export default categoryReducers;
