import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  session: null,
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
      state.session = null;
    },
    sessionTotalAdd(state, action) {
      state.session.total += action.payload;
    },
    sessionTotalSubtract(state, action) {
      state.session.total -= action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(fetchShoppingSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.session = action.payload;
      }
    });
  },
});

export default authSlice.reducer;
export const { userSet, userReset, sessionTotalAdd, sessionTotalSubtract } =
  authSlice.actions;

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const res = await axios.get("/api/user/get_current.php");
    return res.data.user;
  }
);

export const fetchShoppingSession = createAsyncThunk(
  "user/fetchShoppingSession",
  async (user_id) => {
    const res = await axios.get(
      `/api/shopping_session/get.php?user_id=${user_id}`
    );
    return res.data.shopping_session;
  }
);
