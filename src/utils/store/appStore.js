import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import bookSlice from "./bookSlice";
import wishSlice from "./wishSlice";
import orderSlice from './orderSlice';
import addressSlice from './address';

const appStore = configureStore({
  reducer: {
    cart: cartSlice,
    book: bookSlice,
    wish: wishSlice,
    order: orderSlice,
    address:addressSlice
  },
});

export default appStore;
