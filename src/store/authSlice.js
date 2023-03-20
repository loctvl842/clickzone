import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  fetching: false,
  error: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(_, action) {
      return {
        loggedIn: false,
        fetching: true,
        error: false,
        message: action.payload,
      };
    },
    authSuccess(_, action) {
      return {
        loggedIn: true,
        fetching: false,
        error: false,
        message: action.payload,
      };
    },
    authFail(_, action) {
      return {
        loggedIn: false,
        fetching: false,
        error: true,
        message: action.payload,
      };
    },
    authReset() {
      return {
        loggedIn: false,
        fetching: false,
        error: false,
        message: "",
      };
    }
  },
});

export default authSlice.reducer;
export const { authStart, authSuccess, authFail, authReset } = authSlice.actions;
