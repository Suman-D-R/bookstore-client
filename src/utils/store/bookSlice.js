import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    bookData: [],
    searchData: []
  },
  reducers: {
    setBookData: (state, action) => {
      state.bookData = action.payload;
      state.searchData = action.payload;
    },
    filterBookData: (state, action) => {
      const searchKeywords = action.payload;

      state.searchData = state.bookData.filter(book => {
        return (
          book.bookName.toLowerCase().includes(searchKeywords.toLowerCase())
        );
      });
    },
    sortByPrice: (state,action)=>{
      const sortBy = action.payload;

  
      if ("low"===sortBy) {
         state.searchData.sort((a, b) => a.discountPrice - b.discountPrice);
      }
      else if("high"===sortBy){
        state.searchData = state.searchData.sort((a, b) => b.discountPrice - a.discountPrice);
      }
      else{
        state.searchData = state.bookData;
      }
    }
  }
});

export const { setBookData, filterBookData ,sortByPrice} = bookSlice.actions;
export default bookSlice.reducer;
