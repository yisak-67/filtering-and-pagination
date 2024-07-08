import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Products</h2>
      {productStatus === 'loading' && <div>Loading...</div>}
      {productStatus === 'failed' && <div>{error}</div>}
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-green-700 p-4 rounded shadow">
            <h3 className="text-xl">{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
