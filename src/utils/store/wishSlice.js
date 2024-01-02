import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
  name: 'wish',
  initialState: {
    wishlist: {},
  },
  reducers: {
    setWishlistItems: (state, action) => {
      state.wishlist = action.payload;
    },
    addItemToWishlist: (state, action) => {
      const bookToAdd = action.payload;
      const existingIndex = state.wishlist.items.findIndex(val => val.book_id === bookToAdd.book_id);

      if (existingIndex !== -1) {
        state.wishlist.items.splice(existingIndex, 1);
      } else {
        state.wishlist.items.push(bookToAdd);
      }
    },
  },
});

export const { setWishlistItems, addItemToWishlist } = wishSlice.actions;

export default wishSlice.reducer;
