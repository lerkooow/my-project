import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface CartProduct {
  productId: number;
  quantity: number;
}

interface Cart {
  products: CartProduct[];
}

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

interface CartState {
  cart: Cart;
  cartUser: CartUser[];
  isLoading: boolean;
}

const initialState: CartState = {
  cart: { products: [] },
  cartUser: [],
  isLoading: false,
};

export const fetchCart = createAsyncThunk<Cart, string, { rejectValue: string }>(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const localStorageCart = JSON.parse(localStorage.getItem(`cart-${userId}`) || "null");
      if (localStorageCart) {
        return localStorageCart;
      } else {
        const response = await axios.get(`https://fakestoreapi.com/carts/${userId}`);
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
      const promises = productIds.map((productId) =>
        axios.get(`https://fakestoreapi.com/products/${productId}`).then((res) => res.data)
      );
      const products = await Promise.all(promises);
      return products;
    } catch (error) {
      const axiosError = error as AxiosError;

      console.log(axiosError.message);
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
      const currentUserId = localStorage.getItem("currentUserId");
      if (!state.cart || !state.cart.products) {
        state.cart = { products: [] };
      }
      const existingItemIndex = state.cart.products.findIndex((item) => item.productId === productId);
      if (existingItemIndex !== -1) {
        state.cart.products[existingItemIndex].quantity += quantity;
      } else {
        state.cart.products.push({ productId, quantity });
      }
      localStorage.setItem(`cart-${currentUserId}`, JSON.stringify(state.cart));
    },
    deleteToCart(state, action: PayloadAction<{ productId: number }>) {
      const { productId } = action.payload;
      const currentUserId = localStorage.getItem("currentUserId");
      state.cart.products = state.cart.products.filter((item) => item.productId !== productId);
      localStorage.setItem(`cart-${currentUserId}`, JSON.stringify(state.cart));
    },
    updateCart(state, action: PayloadAction<Cart>) {
      const currentUserId = localStorage.getItem("currentUserId");
      state.cart = action.payload;
      localStorage.setItem(`cart-${currentUserId}`, JSON.stringify(state.cart));
    },
    clearCartUser(state) {
      state.cartUser = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
      localStorage.setItem(`cart-${localStorage.getItem("currentUserId")}`, JSON.stringify(state.cart));
      state.isLoading = false;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.isLoading = false;
    });
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
  },
});

export default cartSlice.reducer;
export const { addToCart, deleteToCart, updateCart, clearCartUser } = cartSlice.actions;
