import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userToken") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("userToken", state.token);
    },
    clearUserToken: (state) => {
      state.token = null;
      localStorage.removeItem("userToken");
    },
  },
});

export const { setUserToken, clearUserToken } = userSlice.actions;
export default userSlice.reducer;
