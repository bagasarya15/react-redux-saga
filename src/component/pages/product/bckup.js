import Alert from '../alert';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductPost } from '../../../redux/action/actionReducer';

const UpdateProduct = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [filteredProduct, setFilteredProduct] = useState('');

  let { product, message, refresh } = useSelector(
    (state) => state.productReducer,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleRegistration = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image[0]);
    formData.append('category_id', data.category_id);
    formData.append('description', data.description);
    formData.append('price', data.price);

    const idProduct = filteredProduct.id;
    const result = dispatch(ProductPost(formData, idProduct));

    const status = result.data.status;
    const message = result.data.message;

    if (status) {
      if (status == 200) {
        Alert.AlertSucces(message);
      } else {
        Alert.AlertError(message);
      }
      navigate('/product');
    }
    setTimeout(() => {
      navigate('/product');
    }, 3000);
  };

  const ValidationForm = {
    name: { required: 'name product is required' },
    description: { required: 'description product is required' },
    category_id: { required: 'category is required' },
    price: { required: 'price is required' },
    image: { required: 'image is required' },
  };

  useEffect(() => {
    let defaultValue = {};

    defaultValue.name = filteredProduct.name;
    defaultValue.price = filteredProduct.price;
    defaultValue.category_id = filteredProduct.category_id;
    defaultValue.description = filteredProduct.description;
    reset({ ...defaultValue });

    const filterProduct = product.filter((a) => a.id == params.id)[0];
    setFilteredProduct(filterProduct);
  }, []);

  return (
    <div>
      <p className="text-gray-700 text-2xl mt-2 mb-5 font-bold uppercase">
        Update Product
      </p>
      <div class="border-t-1 border border-black-900"></div>

      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="max-w-xl bg-white py-6 px-3 m-auto w-full">
          <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">
            <div className="col-span-1">
              <input
                name="name"
                placeholder="Nama Produk"
                autoComplete="off"
                {...register('name', ValidationForm.name)}
                className="border w-full rounded-lg text-gray-800 py-2 px-2"
                defaultValue={filteredProduct.name}
              />
              <span className="text-sm text-rose-600">
                {errors?.name && errors.name.message}
              </span>
            </div>
            <div className="col-span-1">
              <textarea
                name="description"
                placeholder="Description"
                autoComplete="off"
                {...register('description', ValidationForm.description)}
                className="border w-full rounded-lg text-gray-800 py-2 px-2"
                defaultValue={filteredProduct.description}
              />
              <span className="text-sm text-rose-600">
                {errors?.description && errors.description.message}
              </span>
            </div>
            <div className="col-span-1">
              <select
                class="bg-gray-50 border border-gray-300 w-full py-2 px-2 text-gray-800 rounded-lg"
                name="category_id"
                {...register('category_id', ValidationForm.category_id)}
              >
                <option value="">Choose a category</option>
              </select>
              <span className="text-sm text-rose-600">
                {errors?.category_id && errors.category_id.message}
              </span>
            </div>
            <div className="col-span-1">
              <input
                name="price"
                placeholder="Price"
                autoComplete="off"
                {...register('price', ValidationForm.price)}
                className="border w-full rounded-lg text-gray-800 py-2 px-2"
                defaultValue={filteredProduct.price}
              />
              <span className="text-sm text-rose-600">
                {errors?.price && errors.price.message}
              </span>
            </div>
            <div className="col-span-1">
              <label className="block">
                <span className="sr-only">Choose product photo</span>
                <input
                  type="file"
                  name="image"
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-900
                    hover:file:bg-blue-100 mt-3"
                  {...register('image', ValidationForm.image)}
                />
                <span className="text-sm text-rose-600">
                  {errors?.image && errors.image.message}
                </span>
              </label>
            </div>
          </div>

          <div class="border-t-1 border border-black-900 mt-5"></div>

          <div className="flex-row space-x-4 mt-4 text-right">
            <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              Submit
            </button>

            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => navigate('/product')}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
