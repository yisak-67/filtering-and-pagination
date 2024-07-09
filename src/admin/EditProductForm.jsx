import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProduct } from './productSlice';

const EditProductForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(state.product);

  useEffect(() => {
    if (!state.product) {
      navigate('/admin');
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    for (let key in formData) {
      updatedFormData.append(key, formData[key]);
    }
    dispatch(updateProduct({ id: formData._id, formData: updatedFormData }));
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input type="file" name="img" onChange={handleFileChange} />
      <input type="text" name="star" value={formData.star} onChange={handleChange} placeholder="Star" />
      <input type="text" name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Reviews" />
      <input type="text" name="prevPrice" value={formData.prevPrice} onChange={handleChange} placeholder="Previous Price" />
      <input type="text" name="newPrice" value={formData.newPrice} onChange={handleChange} placeholder="New Price" />
      <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
      <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProductForm;
