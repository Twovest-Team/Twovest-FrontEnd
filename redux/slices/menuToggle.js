import { createSlice } from "@reduxjs/toolkit";

export const menuToggleSlice = createSlice({
  name: "menuToggle",
  initialState: {
    isOpen: true
  },
  reducers: {
    toggleMenu: (state, action) => {
        state.isOpen = !state.isOpen 
        if(!state.isOpen){
          document.body.style.overflow = 'hidden'
        }else{
          document.body.style.overflowY = 'auto'
        }
    }
  },
});

export const { toggleMenu } = menuToggleSlice.actions;

export default menuToggleSlice.reducer;