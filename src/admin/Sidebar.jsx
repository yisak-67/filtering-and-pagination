import React from 'react';
import { Link } from 'react-router-dom';

const Sidbar = () => {
  return (
    <aside className="w-64 bg-gray-700 min-h-screen p-4">
      <ul>
        <li className="mb-4">
          <Link to="/" className="text-white">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/products" className="text-white">Products</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidbar;
