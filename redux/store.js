import { configureStore } from "@reduxjs/toolkit";
import layoutViewsSlice from "./slices/layoutViews";

export const makeStore = () => {
  return configureStore({
    reducer: {
      layoutViews: layoutViewsSlice
    }
  })
}
