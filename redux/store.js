import { configureStore } from "@reduxjs/toolkit";
import layoutViewsSlice from "./slices/layoutViews";
import userSlice from "./slices/userSlice";
import cartToggleSlice  from "./slices/cartToggle";
import menuToggleSlice from "./slices/menuToggle";
import cartProductsSlice from "./slices/cartProducts";

export const makeStore = () => {
  return configureStore({
    reducer: {
      layoutViews: layoutViewsSlice,
      user: userSlice,
      cartToggle: cartToggleSlice,
      menuToggle: menuToggleSlice,
      cartProducts: cartProductsSlice
    }
  })
}
