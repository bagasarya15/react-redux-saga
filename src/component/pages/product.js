import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDelete, ProductGetAll } from '../../redux/action/actionReducer';
import { ToastContainer, toast } from 'react-toastify';
import Content from './content';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDotsVertical, BsPencil, BsTrash } from 'react-icons/bs';
import DeleteProduct from './product/deleteProduct';
import Swal from 'sweetalert2';
import Alert from './alert';

const Product = () => {
  let { product, message, refresh } = useSelector(
    (state) => state.productReducer,
  );
  
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Confirm?',
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        const result = await dispatch(ProductDelete(id));
        const status = result.data.status;
        const message = result.data.message;

        if (status === 200) {
          setTimeout(() => {
            Alert.AlertSucces(message);
          }, 500);
        }
      } else {
        Swal.fire(
          'Cancelled',
          'Your file is safe.',
          'info'
        );
      }
      dispatch(ProductGetAll());
    } catch (error) {
      console.error('Error deleting data:', error);
      Swal.fire(
        'Error!',
        'Failed to delete data. Please try again.',
        'error'
      );
    }
  };
  
  const dispatch = useDispatch();
  const [productById, setproductById] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    dispatch(ProductGetAll());
  }, [refresh]);

  const port = 'http://localhost:7300/';

  const navigate = useNavigate();

  return (
    <>
      <ToastContainer />

      {isDelete ? (
        <DeleteProduct
          show={isDelete}
          productById={productById}
          closeModal={() => setIsDelete(false)}
        />
      ) : (
        ''
      )}

      <Content title="product">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(product || []).map((p) => (
            <div className="bg-white rounded-lg shadow-lg" key={p.id}>
              <Menu as="div" className="text-left w-full flex justify-end">
                <div className="">
                  <Menu.Button className=" rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <BsThreeDotsVertical
                      className=" h-5 w-5 text-gray-700 hover:text-gray-400 justify-items-end"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute mt-0 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() =>
                              navigate('/edit-product', {
                                state: { ProductData: p },
                              })
                            }
                            // to={`/edit-product/${p.id}`}
                            className={`${
                              active
                                ? 'bg-blue-100 text-blue-900'
                                : 'text-blue-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <BsPencil
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <BsPencil
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                    </div>

                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            // onClick={() => {
                            //   setproductById(p.id);
                            //   setIsDelete(true);
                            // }}
                            onClick={()=>{
                              handleDelete(p.id)
                            }}
                            className={`${
                              active
                                ? 'bg-blue-100 text-blue-900'
                                : 'text-blue-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <BsTrash
                                className="mr-2 h-5 w-5 text-black-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <BsTrash
                                className="mr-2 h-5 w-5 text-black-400"
                                aria-hidden="true"
                              />
                            )}
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <img
                src={`${port}${p.image}`}
                alt={p.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <p className="text-lg font-semibold mb-2">{p.name}</p>
                <p className="text-sm mb-2">{p.product_category.name}</p>
                <div className="border-t-1 border border-black-500" />
                <p className="text-gray-700 mt-2">Harga Product</p>
                <p className="text-red-700 mb-2 font-semibold text-sm">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(p.price)}{' '}
                </p>
                <div className="border-t-1 border border-black-500" />
                <p className="text-gray-700 mt-2">Ringkasan Produk</p>
                <ul className="list-none mt-2">
                  <li className="text-sm">{p.description}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Content>
    </>
  );
};

export default Product;
