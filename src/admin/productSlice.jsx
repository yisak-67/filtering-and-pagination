import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

// Fetch Products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:4001/api/v1/products');
  return response.data.products;
});

// Add Product
export const addProduct = createAsyncThunk('products/addProduct', async (formData) => {
  const response = await axios.post('http://localhost:4001/api/v1/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.product;
});

// Update Product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, formData }) => {
  const response = await axios.patch(`http://localhost:4001/api/v1/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.product;
});
// Delete Product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`http://localhost:4001/api/v1/products/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;


