import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cart-slice';
import userProgressReducer from './slices/user-progress-slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    userProgress: userProgressReducer,
  },
});