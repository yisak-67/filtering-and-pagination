import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from './productSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/products/edit/${product._id}`, { state: { product } });
  };

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Products</h2>
      <button onClick={handleAddProduct} className="mb-4 bg-green-500 text-white p-2">Add Product</button>
      {productStatus === 'loading' && <div>Loading...</div>}
      {productStatus === 'failed' && <div>{error}</div>}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Image</th>
            <th className="border border-gray-200 p-2">Title</th>
            <th className="border border-gray-200 p-2">Star</th>
            <th className="border border-gray-200 p-2">Reviews</th>
            <th className="border border-gray-200 p-2">Previous Price</th>
            <th className="border border-gray-200 p-2">New Price</th>
            <th className="border border-gray-200 p-2">Company</th>
            <th className="border border-gray-200 p-2">Color</th>
            <th className="border border-gray-200 p-2">Category</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-200 p-2">
                <img src={product.img} alt={product.title} width="100" />
              </td>
              <td className="border border-gray-200 p-2">{product.title}</td>
              <td className="border border-gray-200 p-2">{product.star}</td>
              <td className="border border-gray-200 p-2">{product.reviews}</td>
              <td className="border border-gray-200 p-2">{product.prevPrice}</td>
              <td className="border border-gray-200 p-2">{product.newPrice}</td>
              <td className="border border-gray-200 p-2">{product.company}</td>
              <td className="border border-gray-200 p-2">{product.color}</td>
              <td className="border border-gray-200 p-2">{product.category}</td>
              <td className="border border-gray-200 p-2">
                <button onClick={() => handleEdit(product)} className="mr-2 bg-blue-500 text-white p-2">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
