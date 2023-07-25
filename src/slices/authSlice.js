// slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  apiError: "",
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.apiError = "";
      state.isLoading = false;
    },
    setApiError: (state, action) => {
      state.apiError = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserToken, setApiError, setLoading } = authSlice.actions;

export default authSlice.reducer;
