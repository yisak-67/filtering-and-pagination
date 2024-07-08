import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./home.css"
const Home = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    star: '',
    reviews: '',
    prevPrice: '',
    newPrice: '',
    company: '',
    color: '',
    category: '',
    img: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post('http://localhost:4001/api/v1/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="App">
      <h1>Product Manager</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <input type="text" name="star" placeholder="Star" onChange={handleChange} />
        <input type="text" name="reviews" placeholder="Reviews" onChange={handleChange} />
        <input type="text" name="prevPrice" placeholder="Previous Price" onChange={handleChange} />
        <input type="text" name="newPrice" placeholder="New Price" onChange={handleChange} />
        <input type="text" name="company" placeholder="Company" onChange={handleChange} />
        <input type="text" name="color" placeholder="Color" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} />
        <input type="file" name="img" onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <img src={`'http://localhost:4001/${product.img}`} alt={product.title} width="100" />
            <p>Title: {product.title}</p>
            <p>Star: {product.star}</p>
            <p>Reviews: {product.reviews}</p>
            <p>Previous Price: {product.prevPrice}</p>
            <p>New Price: {product.newPrice}</p>
            <p>Company: {product.company}</p>
            <p>Color: {product.color}</p>
            <p>Category: {product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
