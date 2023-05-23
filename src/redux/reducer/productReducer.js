import React from 'react';
import ActionTypes from '../action/actionType';

const initialState = {
  product: [],
  message: '',
  refresh: '',
};

function productReducers(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_PRODUCT:
      return { state, product: payload, refresh: true };
    case ActionTypes.ADD_PRODUCT:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.UPDATE_PRODUCT:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.DEL_PRODUCT:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default productReducers;
