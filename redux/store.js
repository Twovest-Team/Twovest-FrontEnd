import { configureStore } from "@reduxjs/toolkit";
import layoutViewsSlice from "./slices/layoutViews";
import userSlice from "./slices/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      layoutViews: layoutViewsSlice,
      user: userSlice
    }
  })
}
