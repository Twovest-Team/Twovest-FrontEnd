import { createSlice } from "@reduxjs/toolkit";

export const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState: {
    products: []
  },
  reducers: {
    updateCart: (state, action) => {
        state.products = action.payload
    }
  },
});

export const { updateCart } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;