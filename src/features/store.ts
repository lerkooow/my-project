import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import cartSlice from "./cart/cartSlice";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
