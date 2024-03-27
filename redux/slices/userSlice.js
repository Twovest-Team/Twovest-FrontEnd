import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,

  },
  reducers: {
    changeUserData: (state, action) => {
      state.data = action.payload

    },

  },
});

export const { changeUserData } = userSlice.actions;

export default userSlice.reducer;