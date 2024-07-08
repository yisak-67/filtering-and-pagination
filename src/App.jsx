import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navigation from './Navigation/Nav';
import Products from './Product/Product';
import products from './db/data';
import Recommended from './Recommended/Recommended';
import Sidebar from './Sidebar/Sidebar';
import Card from './components/Card';


import Navbar from './admin/Nav';
import Dashboard from './admin/Dashboard';
import ProductList from './admin/ProductList';
import './index.css';
import Sidbar from './admin/Sidebar';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Sidebar handleChange={handleChange} />
              <Navigation query={query} handleInputChange={handleInputChange} />
              <Recommended handleClick={handleClick} />
              <Products result={result} />
            </>
          } />

          <Route path="/admin/*" element={
            <div className="flex">
              <Sidbar />
              <div className="flex-grow">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<ProductList />} />
                </Routes>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
