import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetching: false,
  error: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart() {
      return {
        fetching: true,
        error: false,
        message: "",
      };
    },
    authSuccess(_, action) {
      return {
        fetching: false,
        error: false,
        message: action.payload,
      };
    },
    authFail(_, action) {
      return {
        fetching: false,
        error: true,
        message: action.payload,
      };
    },
    authReset() {
      return {
        fetching: false,
        error: false,
        message: "",
      };
    },
  },
});

export default authSlice.reducer;
export const { authStart, authSuccess, authFail, authReset } = authSlice.actions;
