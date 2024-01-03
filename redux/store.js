import { configureStore } from "@reduxjs/toolkit";
import gendersSlice from "./slices/gendersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      genders : gendersSlice
    }
  })
}
