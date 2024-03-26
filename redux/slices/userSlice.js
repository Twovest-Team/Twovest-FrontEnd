import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data_: null,

  },
  reducers: {
    changeUserData: (state, action) => {
      state.data_ = action.payload

    },

  },
});

export const { changeUserData } = userSlice.actions;

export default userSlice.reducer;