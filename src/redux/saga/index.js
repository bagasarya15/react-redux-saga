import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../action/actionType';
import {
  handleGetAllUser,
  handleAddUser,
  handleDelUser,
  handleUpdateUser,
} from './userSaga';

function* watchAll() {
  yield all([
    takeEvery(ActionTypes.REQ_GET_USERS, handleGetAllUser),
    takeEvery(ActionTypes.ADD_USER, handleAddUser),
    takeEvery(ActionTypes.UPDATE_USER, handleUpdateUser),
    takeEvery(ActionTypes.DEL_USER, handleDelUser),
  ]);
}

export default watchAll;