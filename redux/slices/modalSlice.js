import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {},
  reducers: {
    openModal: (state, action) => {
      const id  = action.payload;
      state[id] = true;
    },
    closeModal: (state, action) => {
      const id = action.payload;
      state[id] = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export const getCurrentModalState = (state, id) => state.modals[id];

export default modalSlice.reducer;
