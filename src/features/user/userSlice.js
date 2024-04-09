import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    switches: JSON.parse(localStorage.getItem('switches')) || 'light',
    userId: localStorage.getItem('userId') || null,
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        switchesColor(state, action) {
            state.switches = action.payload;
            localStorage.setItem('switches', JSON.stringify(state.switches));
        },
        setUserId(state, action) {
            state.userId = action.payload;
            localStorage.setItem('userId', state.userId);
        }
    }
});

export default userSlice.reducer;
export const { switchesColor, setUserId } = userSlice.actions;
