import axios from '../config/endpoint';

const findAll = () => {
  return axios.get('/users');
};

const create = (data) => {
  return axios.post('/users', data);
};

const GetById = async (id) => {
  return axios.get(`/users/${id}`);
};

const update = async (data, id) => {
  return axios.patch(`/users/${id}`, data);
};

const deleteUser = async (data) => {
  // console.log(data)
  return axios.delete(`/users/${data.id}`, data);
};

const GetAllCategory = () => {
  return axios.get('/prod-cat-dto');
};

const GetRoles = () => {
  return axios.get('/roles');
};

const GetAllProduct = () => {
  return axios.get('/product');
};

const PostProduct = (data) => {
  return axios.post('/product', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const UpdateProduct = async (data, id) => {
  return axios.patch(`/product/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const DeleteProduct = async (id) => {
  return axios.delete(`/product/${id}`);
};

export default {
  findAll,
  create,
  GetById,
  update,
  deleteUser,
  GetAllCategory,
  GetRoles,
  GetAllProduct,
  PostProduct,
  UpdateProduct,
  DeleteProduct,
};
