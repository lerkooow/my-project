import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    switches: JSON.parse(localStorage.getItem('switches')) || 'light',
    products: [],
    categories: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    cartUser: []
};

const storeSlice = createSlice({
    name: 'onlineStore',
    initialState,
    reducers: {
        switchesColor(state, action) {
            state.switches = action.payload;
            localStorage.setItem('switches', JSON.stringify(state.switches));
        },
        setProducts(state, action) {
            state.products = action.payload;
        },
        setCategories(state, action) {
            state.categories = action.payload;
        },
        setCart(state, action) {
            state.cart = action.payload;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        setCartUser(state, action) {
            state.cartUser = action.payload;
        },
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const existingItemIndex = state.cart.products.findIndex(item => item.productId === productId);
            if (existingItemIndex !== -1) {
                state.cart.products[existingItemIndex].quantity += quantity;
            } else {
                state.cart.products.push({ productId, quantity });
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }

    }
});

export default storeSlice.reducer;
export const { switchesColor, setProducts, setCart, setCategories, addToCart, setCartUser } = storeSlice.actions;


export const fetchProducts = (sorting, category, limit, categoryUrl) => async (dispatch) => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${categoryUrl}/${category}?limit=${limit}&sort=${sorting}`);
        dispatch(setProducts(response.data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const fetchCartUser = (productIds) => async (dispatch) => {
    try {
        const promises = productIds.map(productId =>
            axios.get(`https://fakestoreapi.com/products/${productId}`).then(res => res.data)
        );
        const products = await Promise.all(promises);
        dispatch(setCartUser(products))
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const fetchCart = (userId) => async (dispatch) => {
    try {
        const localStorageCart = JSON.parse(localStorage.getItem('cart'));
        if (localStorageCart) {
            dispatch(setCart(localStorageCart));
        } else {
            const response = await axios.get(`https://fakestoreapi.com/carts/${userId}`);
            dispatch(setCart(response.data));
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
};

export const fetchCategories = () => async (dispatch) => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/categories`);
        dispatch(setCategories(response.data));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }) => {
        try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const userData = response.data;
            localStorage.setItem('userData', JSON.stringify(userData));
            return userData;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.setItem('userData', JSON.stringify(null));
            }
            console.error('Error logging in:', error);
            throw error;
        }
    }
);


