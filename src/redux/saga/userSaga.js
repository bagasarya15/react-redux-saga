import { call, put } from 'redux-saga/effects';
import apiMethod from '../../component/api/apiMethod';
import {
  doAddResponse,
  doDeleteResponse,
  doGetUserResponse,
  doUpdateResponse,
} from '../action/actionReducer';

function* handleGetAllUser() {
  try {
      const result = yield call(apiMethod.findAll);
      console.log("console2", result.data);
      yield put(doGetUserResponse(result.data));
  } catch (error) {
    yield put(doGetUserResponse({ message: error, status: 400 }));
  }
}

function* handleAddUser(action) {
  try {
    const result = yield call(apiMethod.create, action.payload);
    yield put(doAddResponse(result.data));
  } catch (error) {
    yield put(doAddResponse({ message: error.message, status: 400 }));
  }
}

function* handleUpdateUser(action) {
  try {
    const result = yield call(apiMethod.updateUserCustomer, action.payload);
    yield put(doUpdateResponse(result.data));
  } catch (error) {
    yield put(doUpdateResponse({ message: error.message, status: 400 }));
  }
}

function* handleDelUser(action) {
  try {
    const result = yield call(apiMethod.remove, action.payload);
    yield put(doDeleteResponse(result.data));
  } catch (error) {
    yield put(doDeleteResponse({ message: error.message, status: 400 }));
  }
}

export { handleGetAllUser, handleAddUser, handleUpdateUser, handleDelUser };