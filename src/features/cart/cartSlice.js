import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userIdLocal = localStorage.getItem("userId");

const initialState = {
    cart: userIdLocal ? localStorage.getItem(`cart-${userIdLocal}`) : [],
    cartUser: [],
    isLoading: false,
};

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            const localStorageCart = localStorage.getItem(`cart-${userIdLocal}`);
            if (localStorageCart) {
                return JSON.parse(localStorageCart);
            } else {
                const response = await axios.get(`https://fakestoreapi.com/carts/${userIdLocal}`);
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching cart:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCartUser = createAsyncThunk(
    'cart/fetchCartUser',
    async (productIds, thunkAPI) => {
        try {
            const promises = productIds.map(productId =>
                axios.get(`https://fakestoreapi.com/products/${productId}`).then(res => res.data)
            );
            const products = await Promise.all(promises);
            return products;
        } catch (error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            if (!state.cart || !state.cart.products) {
                state.cart = { products: [] };
            }
            const existingItemIndex = state.cart.products.findIndex(item => item.productId === productId);
            if (existingItemIndex !== -1) {
                state.cart.products[existingItemIndex].quantity += quantity;
            } else {
                state.cart.products.push({ productId, quantity });
            }
            localStorage.setItem(`cart-${userIdLocal}`, JSON.stringify(state.cart));
        }
        ,
        deleteToCart(state, action) {
            const { productId } = action.payload;
            state.cart.products = state.cart.products.filter(item => item.productId !== productId);
            localStorage.setItem(`cart-${userIdLocal}`, JSON.stringify(state.cart));
        },
        updateCart: (state, action) => {
            state.cart = action.payload;
            localStorage.setItem(`cart-${userIdLocal}`, JSON.stringify(state.cart));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCartUser.fulfilled, (state, { payload }) => {
            state.cartUser = payload;
            state.isLoading = false;
        });
        builder.addCase(fetchCartUser.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchCart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
            state.cart = payload;
            localStorage.setItem(`cart-${userIdLocal}`, JSON.stringify(state.cart));
            state.isLoading = false;
        });
        builder.addCase(fetchCart.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default cartSlice.reducer;
export const { addToCart, deleteToCart, updateCart } = cartSlice.actions;