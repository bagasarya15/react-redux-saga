import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productReducers from '../reducer/productReducer';
import categoryReducers from '../reducer/categoryReducer';

import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../saga';
import userReducers from '../reducer/userReducer';

const logger = createLogger();
const saga = createSagaMiddleware();
const reducer = combineReducers({
  userReducers
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false, }).concat(logger).concat(saga)
})

// const reducer = combineReducers({
//   userReducer: userReducers,
//   productReducer: productReducers,
//   categoryReducer: categoryReducers,
// });

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

saga.run(rootSaga) //untuk run saga
export default store;
