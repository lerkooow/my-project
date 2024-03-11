import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    switches: JSON.parse(localStorage.getItem('switches')) || 'light',
};

const storeSlice = createSlice({
    name: 'onlineStore',
    initialState,
    reducers: {
        switchesColor(state, action) {
            // eslint-disable-next-line no-param-reassign
            state.switches = action.payload;
            localStorage.setItem('switches', JSON.stringify(state.switches));
        }
    },
});

export default storeSlice.reducer;
export const { switchesColor, toggleOpenClose } = storeSlice.actions;