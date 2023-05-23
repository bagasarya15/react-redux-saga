import ActionTypes from './actionType';
import ApiMethod from '../../component/api/apiMethod';
import Alert from '../../component/pages/alert';

export const doRequestGetUser = () => {
  // console.log('test22')
  return {
    type: ActionTypes.REQ_GET_USERS,
  };
};

export const doGetUserResponse = (payload) => {
  return {
    type: ActionTypes.GET_USERS_RESPONSE,
    payload,
  };
};

export const doAdd = (payload) => {
  return {
    type: ActionTypes.ADD_USER,
    payload,
  };
};

export const doAddResponse = (payload) => {
  return {
    type: ActionTypes.ADD_USER_RESPONSE,
    payload,
  };
};

export const doUpdate = (payload) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload,
  };
};

export const doUpdateResponse = (payload) => {
  return {
    type: ActionTypes.UPDATE_USER_RESPONSE,
    payload,
  };
};

export const doDelete = (payload) => {
  return {
    type: ActionTypes.DEL_USER,
    payload,
  };
};

export const doDeleteResponse = (payload) => {
  return {
    type: ActionTypes.DEL_USER_RESPONSE,
    payload,
  };
};


export const getAll = () => async (dispatch) => {
  try {
    const res = await ApiMethod.findAll();
    dispatch({
      type: ActionTypes.GET_USER,
      payload: res.data.result,
    });
  } catch (error) {
    alert(error);
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await ApiMethod.GetById(id);
    dispatch({
      type: ActionTypes.GET_USER_ID,
      payload: res.data.result,
    });
  } catch (error) {
    alert(error);
  }
};

export const userUpdate = (data) => async (dispatch) => {
  console.log(data);
  try {
    const res = await ApiMethod.update(data);
    console.log(res.data);
    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: res.data,
    });
    if (res.data.status) {
      if (res.data.status == 200) {
        Alert.AlertSucces(res.data.message);
      } else {
        Alert.AlertError(res.data.message);
      }
    }
  } catch (error) {
    return error.message;
  }
};

export const DelUser = (data) => async (dispatch) => {
  try {
    const res = await ApiMethod.deleteUser(data);
    dispatch({
      type: ActionTypes.DEL_USER,
      payload: res.data.result,
    });

    return res;
  } catch (error) {
    alert(error);
  }
};

export const CategorytGetAll = () => async (dispatch) => {
  try {
    const result = await ApiMethod.GetAllCategory();
    dispatch({
      type: ActionTypes.GET_CATEGORY,
      payload: result.data.result,
    });

    return result;
  } catch (error) {
    alert(error);
  }
};

export const ProductGetAll = () => async (dispatch) => {
  try {
    const result = await ApiMethod.GetAllProduct();
    dispatch({
      type: ActionTypes.GET_PRODUCT,
      payload: result.data.result,
    });

    return result;
  } catch (error) {
    alert(error);
  }
};

export const ProductPost = (data) => async (dispatch) => {
  try {
    const result = await ApiMethod.PostProduct(data);
    dispatch({
      type: ActionTypes.ADD_PRODUCT,
      payload: result.data.result,
    });

    return result;
  } catch (error) {
    alert(error);
  }
};

export const ProductUpdate = (data, id) => async (dispatch) => {
  try {
    const result = await ApiMethod.UpdateProduct(data, id);
    dispatch({
      type: ActionTypes.UPDATE_PRODUCT,
      payload: result.data.result,
    });

    return result;
  } catch (error) {
    alert(error);
  }
};

export const ProductDelete = (id) => async (dispatch) => {
  try {
    const result = await ApiMethod.DeleteProduct(id);
    dispatch({
      type: ActionTypes.DEL_PRODUCT,
      payload: result.data,
    });

    return result;
  } catch (error) {
    alert(error);
  }
};
