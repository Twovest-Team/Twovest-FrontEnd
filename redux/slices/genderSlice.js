import setLocalStorage from "@/utils/localStorage/setLocalStorage";
import { createSlice } from "@reduxjs/toolkit";

export const genderSlice = createSlice({
  name: "gender",
  initialState: {
    data: null
  },
  reducers: {
    updateGender: (state, action) => {
      const genderObject = action.payload
      state.data = genderObject
      setLocalStorage('gender', genderObject)
    },
  }
});

export const { updateGender } = genderSlice.actions;

export default genderSlice.reducer;
