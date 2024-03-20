import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    switches: JSON.parse(localStorage.getItem('switches')) || 'light',
    sorting: localStorage.getItem('sorting') || '',
    products: [],
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
    },
});

export default storeSlice.reducer;
export const { switchesColor, setProducts } = storeSlice.actions;

export const fetchProducts = (sorting, id, limit) => async (dispatch) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${id}?limit=${limit}&sort=${sorting}`);
        const products = await response.json();
        dispatch(setProducts(products));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

