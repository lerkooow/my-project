import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userIdLocal = localStorage.getItem("userId");

const initialState = {
    switches: JSON.parse(localStorage.getItem('switches')) || 'light',
    products: [],
    categories: [],
    cart: userIdLocal ? JSON.parse(localStorage.getItem(`cart-${userIdLocal}`)) : [],
    cartUser: [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ sorting, categoryProducts, limit, categoryUrl }, thunkAPI) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${categoryUrl}/${categoryProducts}?limit=${limit}&sort=${sorting}`);
            console.log("🚀 ~ response.data:", response.data)
            return response.data;
        } catch (error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const storeSlice = createSlice({
    name: 'onlineStore',
    initialState,
    reducers: {
        switchesColor(state, action) {
            state.switches = action.payload;
            localStorage.setItem('switches', JSON.stringify(state.switches));
        },
        setCategories(state, action) {
            state.categories = action.payload;
        },
        setCart(state, action) {
            const { userId, cartData } = action.payload;
            state.cart = cartData;
            localStorage.setItem(`cart-${userId}`, JSON.stringify(cartData));
        },
        setCartUser(state, action) {
            state.cartUser = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
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
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default storeSlice.reducer;
export const { switchesColor, setProducts, setCart, setUser, setCategories, addToCart, setCartUser, deleteToCart, updateCart } = storeSlice.actions;

export const fetchUser = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/users/${userId}`);
        dispatch(setUser(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const fetchCartUser = (productIds) => async (dispatch) => {
    try {
        const promises = productIds.map(productId =>
            axios.get(`https://fakestoreapi.com/products/${productId}`).then(res => res.data)
        );
        const products = await Promise.all(promises);
        dispatch(setCartUser(products));
    } catch (error) {
        dispatch({ type: 'onlineStore/setError', payload: error.message });
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


export const fetchCart = (userId) => async (dispatch) => {
    try {
        const localStorageCart = JSON.parse(localStorage.getItem(`cart-${userId}`));
        if (localStorageCart) {
            dispatch(setCart({ userId, cartData: localStorageCart }));
        } else {
            const response = await axios.get(`https://fakestoreapi.com/carts/${userId}`);
            dispatch(setCart({ userId, cartData: response.data }));
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
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
