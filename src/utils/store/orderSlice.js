import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',
    initialState:{
        orderItems: []
    },
    reducers:{
        setOrders: (state,action)=>{
            state.orderItems = action.payload;
        },
        addItemToOrder: (state, action) => {
            const data = action.payload;
      
            state.orderItems.orderData.push(data);
          }
    }


})

export const { setOrders,addItemToOrder } = orderSlice.actions;

export default orderSlice.reducer;


