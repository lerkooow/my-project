import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storeReducer from './storeSlice';

const rootReducer = combineReducers({
    onlineStore: storeReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;