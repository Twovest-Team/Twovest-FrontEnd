import { createSlice } from "@reduxjs/toolkit";

export const saveLookModalToggle = createSlice({
  name: "lookModalToggle",
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleLookModalToggle: (state, action) => {
        state.isOpen = !state.isOpen
        if(state.isOpen){
          document.body.style.overflow = 'hidden'
        }else{
          document.body.style.overflowY = 'auto'
        }
    }
  },
});

export const { toggleLookModalToggle } = saveLookModalToggle.actions;

export default saveLookModalToggle.reducer;