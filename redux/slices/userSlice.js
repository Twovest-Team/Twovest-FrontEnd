import getAuth from "@/utils/db/auth/getAuth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const user = await getAuth()
  return user;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {
    changeUserData: (state, action) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { changeUserData } = userSlice.actions;

export default userSlice.reducer;
