import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    switches: JSON.parse(localStorage.getItem('switches')) || 'light',
    user: JSON.parse(localStorage.getItem('user')) || null,
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


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error.message);
            return thunkAPI.rejectWithValue(error.message);
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUser.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default userSlice.reducer;
export const { switchesColor } = userSlice.actions;

