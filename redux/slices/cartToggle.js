import { createSlice } from "@reduxjs/toolkit";

export const cartToggleSlice = createSlice({
  name: "cartToggle",
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleCart: (state, action) => {
        state.isOpen = !state.isOpen
        if(state.isOpen){
          document.body.style.overflowY = 'hidden'
        }else{
          document.body.style.overflowY = 'auto'
        }
    }
  },
});

export const { toggleCart } = cartToggleSlice.actions;

export default cartToggleSlice.reducer;