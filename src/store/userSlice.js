import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet(_, action) {
      return action.payload;
    },
    userReset() {
      return null;
    },
  },
});

export default authSlice.reducer;
export const { userSet, userReset } = authSlice.actions;
