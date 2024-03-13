import { createSlice } from "@reduxjs/toolkit";

export const historyProductsSlice = createSlice({
  name: "historyProducts",
  initialState: {
    products: null
  },
  reducers: {
    updateHistory: (state, action) => {
        state.products = action.payload
    }
  },
});

export const { updateHistory } = historyProductsSlice.actions;

export default historyProductsSlice.reducer;