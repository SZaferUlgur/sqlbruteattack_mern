import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productReducer';

export const store = configureStore({
  reducer: {
    productState: productReducer,
  },
});
