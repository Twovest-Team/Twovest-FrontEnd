import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {},
  reducers: {
    openModal: (state, action) => {
      const id  = action.payload;
      state[id] = true;
      document.body.style.overflow = 'hidden'
    },
    closeModal: (state, action) => {
      const id = action.payload;
      state[id] = false;
      document.body.style.overflowY = 'auto'
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export const getCurrentModalState = (state, id) => state.modals[id];

export default modalSlice.reducer;
