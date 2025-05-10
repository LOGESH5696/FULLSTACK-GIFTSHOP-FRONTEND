// src/pages/ProductPage.js
import React from 'react';
import ProductList from '../components/ProductList';
import '../styles/ProductPage.css';

const ProductPage = () => {
  return (
    <div>
      <h1 class="productTitle">Products</h1>
      <ProductList />
    </div>
  );
};

export default ProductPage;
