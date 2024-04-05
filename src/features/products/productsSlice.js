import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    categories: [],
    isLoading: false,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ sorting, categoryProducts, limit, categoryUrl }, thunkAPI) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${categoryUrl}/${categoryProducts}?limit=${limit}&sort=${sorting}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async (_, thunkAPI) => {
        try {
            return await axios
                .get(`https://fakestoreapi.com/products/categories`)
                .then((response) => response.data)
        } catch (error) {
            console.error('Error fetching categories:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
            state.products = payload;
            state.isLoading = false;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
            state.categories = payload;
            state.isLoading = false;
        });
    },
});

export default productsSlice.reducer;
