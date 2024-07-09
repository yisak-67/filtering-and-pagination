import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from './productSlice';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    img: '',
    star: '',
    reviews: '',
    prevPrice: '',
    newPrice: '',
    company: '',
    color: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData));
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="description" />
      <input type="file" name="img" value={formData.img} onChange={handleChange} placeholder="Image URL" />
      <input type="text" name="star" value={formData.star} onChange={handleChange} placeholder="Star" />
      <input type="text" name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Reviews" />
      <input type="text" name="prevPrice" value={formData.prevPrice} onChange={handleChange} placeholder="Previous Price" />
      <input type="text" name="newPrice" value={formData.newPrice} onChange={handleChange} placeholder="New Price" />
      <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
      <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
