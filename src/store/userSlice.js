import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet(state, action) {
      state.data = action.payload;
    },
    userReset(state, _) {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
  },
});

export default authSlice.reducer;
export const { userSet, userReset } = authSlice.actions;

export const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser", async () => {
  const res = await axios.get("/api/user/get_current.php");
  return res.data.user;
});
