import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import { Authapi } from "../Api/Authapi";

export const store = configureStore({
  reducer: {
    [Authapi.reducerPath]: Authapi.reducer,
    productSlice: productSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Authapi.middleware),
});
