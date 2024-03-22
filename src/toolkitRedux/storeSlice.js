import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    switches: JSON.parse(localStorage.getItem('switches')) || 'light',
    products: [],
    loading: false,
    error: null
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
    }
});

export default storeSlice.reducer;
export const { switchesColor, setProducts } = storeSlice.actions;


export const fetchProducts = (sorting, category, limit, categoryUrl) => async (dispatch) => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${categoryUrl}/${category}?limit=${limit}&sort=${sorting}`);
        dispatch(setProducts(response.data));
    } catch (error) {
        console.error('Error fetching products:', error);
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


