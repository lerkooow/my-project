import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface CartUser {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Product {
  productId: number;
  quantity: number;
}

interface CartState {
  cart: { products: Product[] } | null;
  cartUser: CartUser[] | [];
  isLoading: boolean;
}

const userIdLocal = localStorage.getItem("userId");

const initialState: CartState = {
  cart: userIdLocal ? JSON.parse(localStorage.getItem(`cart-${userIdLocal}`) || "null") : { products: [] },
  cartUser: [],
  isLoading: false,
};

export const fetchCart = createAsyncThunk<{ products: Product[] }, void, { rejectValue: string }>(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const localStorageCart = localStorage.getItem(`cart-${userIdLocal}`);
      if (localStorageCart) {
        return JSON.parse(localStorageCart);
      } else {
        const response = await axios.get<{ products: Product[] }>(`https://fakestoreapi.com/carts/${userIdLocal}`);
        return response.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching cart:", axiosError.message);
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  }
);

export const fetchCartUser = createAsyncThunk<CartUser[], number[], { rejectValue: string }>(
  "cart/fetchCartUser",
  async (productIds, thunkAPI) => {
    try {
      const promises = productIds.map((productId: number) =>
        axios.get<CartUser>(`https://fakestoreapi.com/products/${productId}`).then((res) => res.data)
      );
      const products = await Promise.all(promises);
      return products;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const { productId, quantity } = action.payload;
      if (!state.cart || !state.cart.products) {
        state.cart = { products: [] };
      }
      const existingItemIndex = state.cart.products.findIndex((item) => item.productId === productId);
      if (existingItemIndex !== -1) {
        state.cart.products[existingItemIndex].quantity += quantity;
      } else {
        state.cart.products.push({ productId, quantity });
      }
      localStorage.setItem(`cart-${userIdLocal}`, JSON.stringify(state.cart));
    },
    deleteToCart(state, action: PayloadAction<{ productId: number }>) {
      const { productId } = action.payload;
      if (state.cart) {
        state.cart.products = state.cart.products.filter((item) => item.productId !== productId);
        localStorage.setItem(`cart-${userIdLocal}`, JSON.stringify(state.cart));
      }
    },
    updateCart(state, action: PayloadAction<{ products: Product[] }>) {
      state.cart = { products: action.payload.products };
      localStorage.setItem(`cart-${userIdLocal}`, JSON.stringify(state.cart));
    },
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
