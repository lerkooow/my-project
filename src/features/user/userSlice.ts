import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

type Switches = "light" | "dark" | "grey";

interface InitialState {
  switches: Switches;
  userId: string | null;
}

const initialState: InitialState = {
  switches: localStorage.getItem("switches") ? (localStorage.getItem("switches") as Switches) : "light",
  userId: localStorage.getItem("userId") || null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userData = response.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 401) {
        localStorage.setItem("userData", JSON.stringify(null));
      }

      console.error("Error logging in:", axiosError);
      throw axiosError;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    switchesColor(state, action) {
      state.switches = action.payload;
      localStorage.setItem("switches", state.switches);
    },
    setUserId(state, action) {
      state.userId = action.payload;
      if (state.userId) {
        localStorage.setItem("userId", state.userId);
      } else {
        localStorage.removeItem("userId");
      }
    },
  },
});

export default userSlice.reducer;
export const { switchesColor, setUserId } = userSlice.actions;
