import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from './productSlice';

const ProductForm = ({ product, setEditingProduct }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: null,
    rating: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: null,
        rating: product.rating,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (product) {
      dispatch(updateProduct({ id: product._id, form }));
      setEditingProduct(null);
    } else {
      dispatch(addProduct(form));
    }
    setFormData({
      title: '',
      price: '',
      description: '',
      category: '',
      image: null,
      rating: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input type="file" name="image" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <input type="number" name="rating" value={formData.rating} onChange={handleChange} />
      </div>
      <button type="submit" className="mt-4 bg-green-500 text-white p-2">
        {product ? 'Update' : 'Add'} Product
      </button>
      {product && (
        <button type="button" onClick={() => setEditingProduct(null)} className="mt-4 ml-2 bg-gray-500 text-white p-2">
          Cancel
        </button>
      )}
    </form>
  );
};

export default ProductForm;
