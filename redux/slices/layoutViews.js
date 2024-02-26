import { createSlice } from "@reduxjs/toolkit";

export const layoutViewsSlice = createSlice({
  name: "layoutView",
  initialState: {
    currentValue: 1
  },
  reducers: {
    updateView: (state, action) => {
      state.currentValue = action.payload
    },
  },
});

export const { updateView } = layoutViewsSlice.actions;

export default layoutViewsSlice.reducer;