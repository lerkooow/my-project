import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import userSlice from "./user/userSlice";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
    reducer: {
        products: productsSlice,
        user: userSlice,
        cart: cartSlice
    },
    devTools: true,
});

export default store;
