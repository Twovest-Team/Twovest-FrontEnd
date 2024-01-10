import { createSlice } from "@reduxjs/toolkit";

export const menuToggleSlice = createSlice({
  name: "menuToggle",
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleMenu: (state, action) => {
        state.isOpen = !state.isOpen
    }
  },
});

export const { toggleMenu } = menuToggleSlice.actions;

export default menuToggleSlice.reducer;