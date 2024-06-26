import { configureStore } from "@reduxjs/toolkit";
import layoutViewsSlice from "./slices/layoutViews";
import userSlice from "./slices/userSlice";
import cartToggleSlice  from "./slices/cartToggle";
import menuToggleSlice from "./slices/menuToggle";
import cartProductsSlice from "./slices/cartProducts";
import historyProductsSlice from "./slices/historyProducts";
import toggleLookModalToggle from "./slices/saveLookModalToggle";
import modalSlice from "./slices/modalSlice";
import notificationSlice from "./slices/notificationSlice";
import genderSlice from "./slices/genderSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      layoutViews: layoutViewsSlice,
      user: userSlice,
      cartToggle: cartToggleSlice,
      menuToggle: menuToggleSlice,
      lookModalToggle: toggleLookModalToggle,
      cartProducts: cartProductsSlice,
      historyProducts: historyProductsSlice,
      modals: modalSlice,
      notifications: notificationSlice,
      gender: genderSlice,
      
    }
  })
}
